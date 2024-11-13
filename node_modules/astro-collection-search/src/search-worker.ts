
import minisearch, { type SearchOptions, type SearchResult } from 'minisearch';
import type { CollectionSearchResult, WorkerMessage, SearchQueryMessage, SearchResultsMessage, ErrorMessage } from './search';
import * as constants from './constants';

let index: minisearch|undefined;
let base_uri = '';

const Search = async (message: SearchQueryMessage) => {

  if (!index) {
    const response = await fetch(new URL(`${constants.artifacts_directory}/${constants.index_name}`, base_uri));
    if (response.ok) {
      const { index: data, fields, storeFields } = await response.json();
      index = minisearch.loadJS(data, {
        fields, storeFields
      });
    }
  }

  if (!index) {
    const response: ErrorMessage = {
      type: 'search-error',
      message: 'failed to load search index',
      transaction: message.transaction,
    };
    postMessage(response);
    return;
  }

  const response: SearchResultsMessage = {
    type: 'search-results',
    list: index.search(message.query, message.options) as CollectionSearchResult[],
    transaction: message.transaction,
  };

  postMessage(response);

};

onmessage = (event: MessageEvent<WorkerMessage>) => {
  if (typeof event.data === 'object') {
    switch (event.data.type) {
      case 'search':
        Search(event.data);
        return;

      case 'init':
        base_uri = event.data.base_uri;
        return;
    }
  }

  // dev
  console.info({event});
};



