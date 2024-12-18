
import { type SearchOptions, type SearchResult } from 'minisearch';
import * as constants from './constants';

// we are adding some default fields to search results, 
// so we can type them a bit better

export type CollectionSearchResult = SearchResult & {
  frontmatter: Record<string, string>;
  collection: string;
  file: string;
}

export interface InitMessage {
  type: 'init';
  base_uri: string;
}

export interface SearchQueryMessage {
  type: 'search';
  query: string;
  options: SearchOptions;
  transaction: number;
}

export type WorkerMessage = InitMessage|SearchQueryMessage;

export interface ErrorMessage {
  type: 'search-error';
  message?: string;
  transaction: number;
}

export interface SearchResultsMessage {
  type: 'search-results';
  list: CollectionSearchResult[];
  transaction: number;
}

export type ResponseMessage = ErrorMessage|SearchResultsMessage;

export type ExtendedSearchOptions = SearchOptions & {
  base_uri: string;
}

let worker: Worker|undefined;

// we have to account for requests that overlap, we'll use a transaction.
// store the promise executor so we can call it when the transaction is
// finished.
//
// (overlapping requests might happen if you do "live" search while typing)

type PromiseArguments = Parameters<ConstructorParameters<typeof Promise<CollectionSearchResult[]>>[0]>

type Resolver = {
  resolve: PromiseArguments[0],
  reject: PromiseArguments[1],
};

const transactions: Map<number, Resolver> = new Map();
let txid = 100;

const default_options: SearchOptions = {
  fuzzy: .3, 
  prefix: true,
};

/**
 * splitting out init so we can optionally warm start.
 */
const InitWorker = (base_uri?: string) => {

  if (worker) {
    return;
  }

  if (!base_uri && typeof document !== 'undefined') {

    let base: string = import.meta.env.BASE_URL || '/';
    if (!base.endsWith('/')) { base += '/'; }

    base_uri = new URL(base, document.baseURI).toString();
  }

  const parts = [
    constants.artifacts_directory,
    constants.worker_name,
  ];

  worker = new Worker(new URL(parts.join('/'), base_uri || ''));
  worker.onmessage = (event: MessageEvent<ResponseMessage>) => {
    if (typeof event.data === 'object') {
      switch (event.data.type) {
        case 'search-error':
          {
            const resolver = transactions.get(event.data.transaction);
            if (resolver) {
              transactions.delete(event.data.transaction);
              resolver.reject(event.data.message);
            }
          }
          break;

        case 'search-results':
          {
            const resolver = transactions.get(event.data.transaction);
            if (resolver) {
              transactions.delete(event.data.transaction);
              resolver.resolve(event.data.list);
            }
          }
          break;
      }
    }
  };

  worker.postMessage({
    type: 'init',
    base_uri,
  });

};

/**
 * optionally initialize the worker ahead of searching, to reduce delay
 * on the first search. 
 * 
 * @param base_uri 
 */
export const WarmStart = (base_uri?: string) => {
  InitWorker(base_uri);
};

/**
 * search options extends minisearch search options, so you can pass
 * any valid minisearch option; however because we send these options to
 * a worker, you cannot pass functions as option values. 
 * 
 * default options are  `{ fuzzy: .3, prefix: true }`. 
 * 
 * @param query 
 * @param options 
 * @returns 
 */
export const Search = (query: string, options: Partial<ExtendedSearchOptions> = {}) => {

  InitWorker(options.base_uri);

  options = { 
    ...default_options, 
    ...options 
  };

  const transaction = txid++;

  return new Promise<CollectionSearchResult[]>((resolve, reject) => {

    if (!worker) {
      throw new Error('worker failed');
    }

    transactions.set(transaction, {resolve, reject});    

    worker.postMessage({
      type: 'search',
      query,
      options,
      transaction,
    });

  });

};



