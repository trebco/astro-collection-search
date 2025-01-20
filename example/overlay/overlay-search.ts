
import { type CollectionSearchResult, type ExtendedSearchOptions, Search, WarmStart } from '../../src';

export interface SearchOptions {

  /** create a link from a search result */
  create_link: (result: CollectionSearchResult) => string;

  /** max results to show for any search */
  max?: number;

  /** scrore threshold */
  threshold?: number;

  /** method for filtering search results */
  filter?: (result: CollectionSearchResult) => boolean;

  /** optionally reformat the description */
  format_description?: (result: CollectionSearchResult) => string;

  /** optionally reformat the title */
  format_title?: (result: CollectionSearchResult) => string;

  /** create a group header from a collection name */
  group_header: (collection: string) => string;

  /** text to show when there are no results (but we have a query) */
  no_results_text: string;

  /** placeholder for the input box */
  input_placeholder: string;

  /** options to pass to the Search method. use this to set minisearch options. */
  search_options?: Partial<ExtendedSearchOptions>;

}

/**
 * default options. override when calling Init(). we will merge.
 */
const default_options: SearchOptions = {
  create_link: (result: CollectionSearchResult) => {
    let base = import.meta.env.BASE_URL || '/';
    if (!base.endsWith('/')) { base += '/'; }
    return (base + result.collection + '/' + result.file.replace(/\.mdx{0,1}$/, '')).toLowerCase();
  },
  group_header: (collection: string) => {
    return `Results from ${collection}:`;
  },
  no_results_text: 'Your search returned no results',
  input_placeholder: 'Search',
};

/**
 * show the search dialog
 */
export const OpenSearch = () => {
  if (!dialog) {
    InitSearch();
  }
  dialog?.Open(); 
};

/**
 * initialize search. we set up the dialog and populate existing 
 * results, if any (from session storage). 
 * @param options 
 */
export const InitSearch = (options: Partial<SearchOptions> = {}) => {

  if (!dialog) {
    const element = document.querySelector('#overlay-search-dialog');
    if (element instanceof HTMLDialogElement) {
      dialog = new SearchDialog(element, {
        ...default_options, ...options
      });
    }
    else {
      throw('overlay search: dialog element not found');
    }
  }

};

/**
 * doesn't really need to be a class
 */
class SearchDialog {

  public input: HTMLInputElement;
  public results: HTMLElement;
  public template: HTMLTemplateElement;
  public clear_button: HTMLButtonElement;
  public group_template: HTMLTemplateElement;
  public active_node?: HTMLElement;
  public selected_index = -1;
  public default_content: HTMLElement;

  constructor(public dialog: HTMLDialogElement, public options: SearchOptions) {

    // push down to body. as long as body doesn't scroll, we won't 
    // get page scrolling when the dialog is open. 

    // can we put under html? does that solve the scroll problem?
    // would be preferable. (the answer is no; if the dialog is under 
    // <html/> it still scrolls the body)

    if (document.body.parentElement) {
      document.body.parentElement.append(dialog);
    }

    // --- collect nodes -------------------------------------------------------

    this.input = dialog.querySelector('.query') as HTMLInputElement;
    this.results = dialog.querySelector('.search-results-list') as HTMLElement;
    this.template = dialog.querySelector('.result-template') as HTMLTemplateElement;
    this.clear_button = dialog.querySelector('.clear-query') as HTMLButtonElement;
    this.group_template = dialog.querySelector('.result-group-header-template') as HTMLTemplateElement;
    this.default_content = dialog.querySelector('.default-content') as HTMLElement;

    // --- update content ------------------------------------------------------

    this.input.placeholder = options.input_placeholder;

    // --- event handlers ------------------------------------------------------

    // close with clicks on the backdrop. don't use click because you
    // might catch stray mouseups.

    dialog.addEventListener('mousedown', event => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    // highlight on focus

    this.results.addEventListener('focusin', event => {
      if (event.target instanceof HTMLElement && event.target.classList.contains('search-result')) {
        this.SelectElement(event.target);
      }
    });

    // and on mouse enter

    this.results.addEventListener('mousemove', event => {
      if (event.target instanceof HTMLElement && event.target.classList.contains('search-result')) {
        this.SelectElement(event.target);
      }
    });

    // navigate on result click
    // (switched to anchor tags)

    // we want to close the dialog immediately before closing
    // the page. if we don't, the dialog will be visible if you
    // go back via history or back button, which is bad ux.

    // we don't want to close it immediately, though, as there
    // might be a slight delay loading the target page and it 
    // looks janky.

    document.addEventListener('pagehide', () => {
      this.dialog.close();
    });

    /*
    this.results.addEventListener('click', event => {
      if (event.target instanceof HTMLElement) {
        if (event.target.dataset.link) {

          // we want to close the dialog immediately before closing
          // the page. if we don't, the dialog will be visible if you
          // go back via history or back button, which is bad ux.

          // we don't want to close it immediately, though, as there
          // might be a slight delay loading the target page and it 
          // looks janky.

          document.addEventListener('pagehide', () => {
            this.dialog.close();
          });

          document.location = event.target.dataset.link;
        }
      }
    });
    */

    // store scroll position

    let timeout = 0;
    this.results.addEventListener('scroll', event => {
      if (!timeout) {
        timeout = window.setTimeout(() => {
          sessionStorage.setItem('scroll-top', this.results.scrollTop.toString());
          timeout = 0;
        }, 250);
      }
    });

    // run the query on input events

    this.input.addEventListener('input', async () => {
      const query = this.input.value.trim();
      if (query) {
        const list = await Search(query, options.search_options);
        this.PopulateResults(list);
        this.results.scrollTop = 0;
        this.StoreSessionData(query, '', list);
      }
      else {
        this.results.textContent = '';
        this.SetResultsState('no-query');
        this.default_content.style.display = "block";
        this.StoreSessionData();
      }
    });

    // "clear" button

    this.clear_button.addEventListener('click', () => {
      this.input.value = '';
      this.results.textContent = '';
      this.StoreSessionData();
      this.input.focus();
    });

    this.Init();

  }

  public StoreSessionData(query = '', selected_index: number|string = '', list: CollectionSearchResult[] = []) {
    sessionStorage.setItem('query', query);
    sessionStorage.setItem('selected-index', selected_index.toString());
    sessionStorage.setItem('results', JSON.stringify(list));
  }

  public SetResultsState(state: 'no-query'|'no-results'|'results') {

    switch (state) {
      case 'no-query':
        this.results.classList.remove('no-results');
        this.results.classList.remove('results');
        this.results.classList.add('no-query');
        break;

      case 'no-results':
        this.results.classList.add('no-results');
        this.results.classList.remove('results');
        this.results.classList.remove('no-query');
        break;

      case 'results':
        this.results.classList.remove('no-results');
        this.results.classList.add('results');
        this.results.classList.remove('no-query');
        break;
    }

  }

  /**
   * select an element. we add a class and track the item
   */
  public SelectElement(element: HTMLElement) {
    if (this.active_node !== element) {
      if (this.active_node) {
        this.active_node.classList.remove('active');
      }
      this.active_node = element;
      this.active_node.classList.add('active');
      this.selected_index = Number(this.active_node.dataset.index);
      sessionStorage.setItem('selected-index', this.selected_index.toString());
    }
  }
  
  /** 
   * fill in template content 
   */
  public SetContent(root: HTMLElement, data: Record<string, string|{ text?: string, attributes: Record<string, string>}>) {
    for (const [key, value] of Object.entries(data)) {
      const element = root.querySelector(`[data-target=${key}]`);
      if (element) {
        if (typeof value === 'string') {
          element.textContent = value;
        }
        else {
          if (typeof value.text === 'string') {
            element.textContent = value.text;
          }
          for (const attribute of Object.entries(value.attributes)) {
            element.setAttribute(...attribute);
          }
        }
      }
    }
    return root; // fluent
  }

  /** 
   * create list of results, using template.
   */
  public PopulateResults(list: CollectionSearchResult[]) {

      // this should come back if you clear the query? not sure
      this.default_content.style.display = "none";

      if (this.options.threshold) {
        const threshold = this.options.threshold;
        list = list.filter(test => test.score >= threshold);
      }

      if (this.options.filter) {
        const filter = this.options.filter;
        list = list.filter(test => filter(test));
      }

      if (this.options.max) {
        list = list.slice(0, this.options.max);
      }

      if (!list.length) {
        
        // FIXME: parameterize
        // FIXME: add a class for this
        this.results.textContent = this.options.no_results_text;
        this.SetResultsState('no-results');

      }
      else {
        this.results.textContent = '';
        this.SetResultsState('results');

        const groups: Record<string, CollectionSearchResult[]> = {};
        for (const entry of list) {
          const collection = entry.collection;
          if (!groups[collection]) {
            groups[collection] = [];
          }
          groups[collection].push(entry);
        }

        let index = 0; // item counter across groups

        for (const [collection, list] of Object.entries(groups)) {

          const header = this.group_template.content.cloneNode(true) as HTMLElement;
          this.SetContent(header, { 'result-group-header': this.options.group_header(collection) });
          this.results.append(header);

          this.results.append(...list.map(result => {
            const clone = this.template.content.cloneNode(true) as HTMLElement;
            const link = this.options.create_link(result);

            const description = this.options.format_description ? 
              this.options.format_description(result) : (result.frontmatter.description || 'No description');

            const title = this.options.format_title ? 
              this.options.format_title(result) : (result.frontmatter.title || 'No title');

            this.SetContent(clone, {
              title,
              description,
              result: { attributes: { 'data-link': link, 'data-index': (index++).toString(), href: link }},
            });
            return clone;
          }));
        }
      }
  }

  /**
   * show the search dialog
   */
  public Open() {

    // load the search worker and index. that makes the first search 
    // faster, if the index is not in cache

    WarmStart();
    this.dialog.showModal();

    // this has to be done (I believe) after showing the dialog

    const text = sessionStorage.getItem('scroll-top');
    if (text) {
      requestAnimationFrame(() => {
        this.results.scrollTop = Number(text);        
      });
    }

    // seems like a good idea but feels clunky in actual use
    // input.select();

  }

  /**
   * populate existing data here once we have options. this is now
   * just always called from the ctor.
   */
  public Init() {

    const query = sessionStorage.getItem('query') || '';
    this.input.value = query;

    // default state, will get overwritten by PopulateResults
    this.SetResultsState('no-query');

    const json = sessionStorage.getItem('results');

    if (json && query) {
      try {
        const list = JSON.parse(json);
        if (Array.isArray(list)) {
          this.PopulateResults(list);
        }
      }
      catch (err) {
        console.error(err);
      }
    }

    // retain last highlighted link

    let text = sessionStorage.getItem('selected-index');
    if (text) {
      this.selected_index = Number(text);
      const element = this.dialog.querySelector(`[data-index="${this.selected_index}"]`);
      if (element instanceof HTMLElement){ 
        this.active_node = element;
        this.active_node.classList.add('active');
      }
    }

  }

}

let dialog: SearchDialog|undefined;

