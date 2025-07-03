
import minisearch from 'minisearch';
import fs from 'fs/promises';
import path from 'path';
import * as constants from './constants';
import * as jsyaml from 'js-yaml';

import type { AstroIntegration, AstroIntegrationLogger } from 'astro';

// reexport the search method and result type
export { Search, WarmStart } from './search';
export type { CollectionSearchResult, ExtendedSearchOptions } from './search';

/**
 * integration options
 */
export interface SearchIndexOptions {

  /** collection to index, or an array of collections (by name) */
  collections?: string|string[];

  /**
   * fields to index. defaults to 'title' and 'description'. we always
   * index the post body, plus whatever fields are specified.
   */
  fields?: string|string[];

  /**
   * defaults to `public`. we put the search index and the search worker
   * into this directory. if you change it, you will need to pass the 
   * base URI when calling `Search`.
   */
  directory?: string;
  
}

type Doc = { 
  id?: number,
  frontmatter?: Record<string, string>
} & { [key: string]: string };

/**
 * list available collections, subdirs of src/content
 */
const ListCollections = async () => {
  const base = path.join('src', 'content');
  const files = await fs.readdir(base);
  const list: string[] = [];

  for (const file of files) {
    if ((await fs.stat(path.join(base, file))).isDirectory()) {
      list.push(file);
    }
  } 

  return list;
};

/**
 * recursively walk directory
 */
async function *ListFiles(start: string): AsyncGenerator<string, undefined, void> {
  const files = await fs.readdir(start);

  for (const file of files) {
    const file_path = path.join(start, file);
    const directory = (await fs.stat(file_path)).isDirectory();
    if (directory) {
      yield *ListFiles(file_path);
    } 
    else {
      yield await Promise.resolve(file_path);
    }
  }
}

/**
 * this relies on collections being in the magic directory src/content.
 * not sure how reliable or stable that is. seems to be the way astro 
 * expects it, though.
 * 
 * @param collection 
 */
const ReadCollection = async (collection: string, fields: string[], logger: AstroIntegrationLogger) => {

  logger.info(`reading collection: ${collection}`);

  const docs: Doc[] = [];
  const dir = path.join('src', 'content', collection);

  // FIXME: I think the YAML parser will throw so we should 
  // catch on a document-by-document basis, and report errors

  try {

    for await (const entry of ListFiles(dir)) {
    
      if (/\.mdx{0,1}$/i.test(entry)) {
        const file = path.relative(dir, entry);

        const contents = await fs.readFile(entry, { encoding: 'utf-8' });
        let [_, fm, body] = contents.split('---\n');

        const yaml = jsyaml.load(fm);

        const doc: Doc = {
          body,
          collection,
          file,
        }; 
        
        const frontmatter: Record<string, string> = {};

        if (yaml && typeof yaml === 'object') {
          for (const [key, value] of Object.entries(yaml)) {

            // what to do with non-string values? for numbers it
            // makes sense to convert but what about arrays or objects?

            if (value === null) {
              frontmatter[key] = '';
            }
            else {
              frontmatter[key] = value.toString();
            }

            // since we're using yaml we can assume quotes parsed properly
            // and any quotes left over are intentional
            
            if (fields.includes(key)) {
              doc[key] = frontmatter[key];
            }

          }
        }
        else if (yaml) {
          console.info("YAML ERROR");
        }

        doc.frontmatter = frontmatter;
        docs.push(doc);

      }
    }
  }
  catch (err) {
    console.error(err);
  }

  return docs;

};

const RebuildSearchIndex = async (options: SearchIndexOptions = {}, logger: AstroIntegrationLogger) => {
 
  logger.info(`building search index`);
  const start = performance.now();

  const docs: Doc[] = [];

  let fields = options.fields || ['title', 'description'];
  if (!Array.isArray(fields)) { 
    fields = [fields]; 
  }

  if (!options.collections) {
    options.collections = await ListCollections();
  }

  if (options.collections) {
    const collections = Array.isArray(options.collections) ? options.collections : [options.collections];
    for (const collection of collections) {
      docs.push(...await ReadCollection(collection, fields, logger));
    }
  }

  if (docs.length) {

    // assign IDs

    for (const [id, doc] of docs.entries()) {
      doc.id = id;
    }

    const index = new minisearch({
      fields: [...fields, 'body'],
      storeFields: ['frontmatter', 'collection', 'file'],
    });

    index.addAll(docs);

    logger.info(`indexed ${docs.length} doc${docs.length === 1 ? '' : 's'}`);

    logger.info(`writing search index`);

    // for some reason minisearch doesn't serialize options, so we have
    // to keep track of them ourselves. we should talk to them about that.

    // while we're doing that let's keep track of our options as well

    const json = JSON.stringify({
      index,
      fields: [...fields, 'body'],
      storeFields: [...fields, 'frontmatter', 'collection', 'file'], // do we need to duplicate fields here?

      collections: options.collections,
    });

    const artifacts_directory = path.join(options.directory ?? 'public', constants.artifacts_directory);
    await fs.mkdir(artifacts_directory, { recursive: true });

    await fs.writeFile(path.join(options.directory ?? 'public', constants.artifacts_directory, constants.index_name), json, { encoding: 'utf-8' });

    // copy search worker. we don't need to do this every time, FIXME

    // this is the name in our dist/ directory, not what it will be named
    // when it's copied. don't change this one (unless you change the build
    // output).

    const worker = 'minisearch-worker.mjs';

    logger.info(`copying search worker`);
    await fs.copyFile(path.join(import.meta.dirname, '..', 'dist', worker), path.join(options.directory ?? 'public', constants.artifacts_directory, constants.worker_name));

  }
  else {
    logger.warn('no documents found for index');
  }

  const end = performance.now();
  logger.info(`complete in ${(end - start).toFixed(2)}ms`);

};

const createPlugin = (options?: SearchIndexOptions): AstroIntegration => {
  const integration: AstroIntegration = {
    name: 'Collection search',
    hooks: {
      
      'astro:config:done': async ({ logger }) => {
        await RebuildSearchIndex(options, logger);
			},

    },

  };

  return integration;
};

export default createPlugin;
