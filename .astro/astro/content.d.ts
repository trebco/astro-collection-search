declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"1783_Great_Meteor.mdx": {
	id: "1783_Great_Meteor.mdx";
  slug: "1783_great_meteor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1891_Martinique_hurricane.mdx": {
	id: "1891_Martinique_hurricane.mdx";
  slug: "1891_martinique_hurricane";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1901_Caister_lifeboat_disaster.mdx": {
	id: "1901_Caister_lifeboat_disaster.mdx";
  slug: "1901_caister_lifeboat_disaster";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1923_WAAA_Championships.mdx": {
	id: "1923_WAAA_Championships.mdx";
  slug: "1923_waaa_championships";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1949_Kemi_strike.mdx": {
	id: "1949_Kemi_strike.mdx";
  slug: "1949_kemi_strike";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1954_Rugby_League_World_Cup.mdx": {
	id: "1954_Rugby_League_World_Cup.mdx";
  slug: "1954_rugby_league_world_cup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1970_Bhola_cyclone.mdx": {
	id: "1970_Bhola_cyclone.mdx";
  slug: "1970_bhola_cyclone";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"1994_Swedish_European_Union_membership_referendum.mdx": {
	id: "1994_Swedish_European_Union_membership_referendum.mdx";
  slug: "1994_swedish_european_union_membership_referendum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2001_Kunlun_earthquake.mdx": {
	id: "2001_Kunlun_earthquake.mdx";
  slug: "2001_kunlun_earthquake";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2008_G20_Washington_summit.mdx": {
	id: "2008_G20_Washington_summit.mdx";
  slug: "2008_g20_washington_summit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2017_Turku_attack.mdx": {
	id: "2017_Turku_attack.mdx";
  slug: "2017_turku_attack";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"2019_Saugus_High_School_shooting.mdx": {
	id: "2019_Saugus_High_School_shooting.mdx";
  slug: "2019_saugus_high_school_shooting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"4_World_Trade_Center.mdx": {
	id: "4_World_Trade_Center.mdx";
  slug: "4_world_trade_center";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"AD_707.mdx": {
	id: "AD_707.mdx";
  slug: "ad_707";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"AD_911.mdx": {
	id: "AD_911.mdx";
  slug: "ad_911";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aaron_Copland.mdx": {
	id: "Aaron_Copland.mdx";
  slug: "aaron_copland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Abbo_of_Fleury.mdx": {
	id: "Abbo_of_Fleury.mdx";
  slug: "abbo_of_fleury";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Abraham_Flexner.mdx": {
	id: "Abraham_Flexner.mdx";
  slug: "abraham_flexner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adalbero_III_of_Luxembourg.mdx": {
	id: "Adalbero_III_of_Luxembourg.mdx";
  slug: "adalbero_iii_of_luxembourg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adam_Gilchrist.mdx": {
	id: "Adam_Gilchrist.mdx";
  slug: "adam_gilchrist";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adam_Makowicz.mdx": {
	id: "Adam_Makowicz.mdx";
  slug: "adam_makowicz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adam_Shantry.mdx": {
	id: "Adam_Shantry.mdx";
  slug: "adam_shantry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adam_Storke.mdx": {
	id: "Adam_Storke.mdx";
  slug: "adam_storke";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Addie_Viola_Smith.mdx": {
	id: "Addie_Viola_Smith.mdx";
  slug: "addie_viola_smith";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adela_of_Champagne.mdx": {
	id: "Adela_of_Champagne.mdx";
  slug: "adela_of_champagne";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adina_Howard.mdx": {
	id: "Adina_Howard.mdx";
  slug: "adina_howard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ado_Birk.mdx": {
	id: "Ado_Birk.mdx";
  slug: "ado_birk";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Adrienne_Corri.mdx": {
	id: "Adrienne_Corri.mdx";
  slug: "adrienne_corri";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Agapitus_of_Palestrina.mdx": {
	id: "Agapitus_of_Palestrina.mdx";
  slug: "agapitus_of_palestrina";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Agneta_Horn.mdx": {
	id: "Agneta_Horn.mdx";
  slug: "agneta_horn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Agostina_Livia_Pietrantoni.mdx": {
	id: "Agostina_Livia_Pietrantoni.mdx";
  slug: "agostina_livia_pietrantoni";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ahmed_Jabari.mdx": {
	id: "Ahmed_Jabari.mdx";
  slug: "ahmed_jabari";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aircraft_carrier.mdx": {
	id: "Aircraft_carrier.mdx";
  slug: "aircraft_carrier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Airplane.mdx": {
	id: "Airplane.mdx";
  slug: "airplane";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aisha_Hinds.mdx": {
	id: "Aisha_Hinds.mdx";
  slug: "aisha_hinds";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Al_Quie.mdx": {
	id: "Al_Quie.mdx";
  slug: "al_quie";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alabama.mdx": {
	id: "Alabama.mdx";
  slug: "alabama";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alain_Delon.mdx": {
	id: "Alain_Delon.mdx";
  slug: "alain_delon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alain_Digbeu.mdx": {
	id: "Alain_Digbeu.mdx";
  slug: "alain_digbeu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alberic_of_Utrecht.mdx": {
	id: "Alberic_of_Utrecht.mdx";
  slug: "alberic_of_utrecht";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alberto_Hurtado.mdx": {
	id: "Alberto_Hurtado.mdx";
  slug: "alberto_hurtado";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alberto_Lattuada.mdx": {
	id: "Alberto_Lattuada.mdx";
  slug: "alberto_lattuada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aldo_Nova.mdx": {
	id: "Aldo_Nova.mdx";
  slug: "aldo_nova";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aleardo_Aleardi.mdx": {
	id: "Aleardo_Aleardi.mdx";
  slug: "aleardo_aleardi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_Gordon_Laing.mdx": {
	id: "Alexander_Gordon_Laing.mdx";
  slug: "alexander_gordon_laing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_Grothendieck.mdx": {
	id: "Alexander_Grothendieck.mdx";
  slug: "alexander_grothendieck";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_I_of_Russia.mdx": {
	id: "Alexander_I_of_Russia.mdx";
  slug: "alexander_i_of_russia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_Nevsky.mdx": {
	id: "Alexander_Nevsky.mdx";
  slug: "alexander_nevsky";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_Rodzyanko.mdx": {
	id: "Alexander_Rodzyanko.mdx";
  slug: "alexander_rodzyanko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alexander_the_Great.mdx": {
	id: "Alexander_the_Great.mdx";
  slug: "alexander_the_great";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alfred_Wallis.mdx": {
	id: "Alfred_Wallis.mdx";
  slug: "alfred_wallis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"All_Nippon_Airways_Flight_533.mdx": {
	id: "All_Nippon_Airways_Flight_533.mdx";
  slug: "all_nippon_airways_flight_533";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Allan_Sandage.mdx": {
	id: "Allan_Sandage.mdx";
  slug: "allan_sandage";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Allies_of_World_War_I.mdx": {
	id: "Allies_of_World_War_I.mdx";
  slug: "allies_of_world_war_i";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Alvin_Dark.mdx": {
	id: "Alvin_Dark.mdx";
  slug: "alvin_dark";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Amelia_Bence.mdx": {
	id: "Amelia_Bence.mdx";
  slug: "amelia_bence";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Amelia_Boynton_Robinson.mdx": {
	id: "Amelia_Boynton_Robinson.mdx";
  slug: "amelia_boynton_robinson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"American_Civil_War.mdx": {
	id: "American_Civil_War.mdx";
  slug: "american_civil_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"American_International_Airways_Flight_808.mdx": {
	id: "American_International_Airways_Flight_808.mdx";
  slug: "american_international_airways_flight_808";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"American_Revolutionary_War.mdx": {
	id: "American_Revolutionary_War.mdx";
  slug: "american_revolutionary_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"American_football.mdx": {
	id: "American_football.mdx";
  slug: "american_football";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Amory_Lovins.mdx": {
	id: "Amory_Lovins.mdx";
  slug: "amory_lovins";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Andi_Deris.mdx": {
	id: "Andi_Deris.mdx";
  slug: "andi_deris";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Andrew_Inglis_Clark.mdx": {
	id: "Andrew_Inglis_Clark.mdx";
  slug: "andrew_inglis_clark";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Andrew_Strong.mdx": {
	id: "Andrew_Strong.mdx";
  slug: "andrew_strong";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Andy_Samberg.mdx": {
	id: "Andy_Samberg.mdx";
  slug: "andy_samberg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anglican_Communion.mdx": {
	id: "Anglican_Communion.mdx";
  slug: "anglican_communion";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Animal_magnetism.mdx": {
	id: "Animal_magnetism.mdx";
  slug: "animal_magnetism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anis_Mansour.mdx": {
	id: "Anis_Mansour.mdx";
  slug: "anis_mansour";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anita_Loos.mdx": {
	id: "Anita_Loos.mdx";
  slug: "anita_loos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anna_Akana.mdx": {
	id: "Anna_Akana.mdx";
  slug: "anna_akana";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anna_of_Oldenburg.mdx": {
	id: "Anna_of_Oldenburg.mdx";
  slug: "anna_of_oldenburg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anne_of_Burgundy.mdx": {
	id: "Anne_of_Burgundy.mdx";
  slug: "anne_of_burgundy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Anne_of_France.mdx": {
	id: "Anne_of_France.mdx";
  slug: "anne_of_france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Antonio_Ferramolino.mdx": {
	id: "Antonio_Ferramolino.mdx";
  slug: "antonio_ferramolino";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Antonio_Salieri.mdx": {
	id: "Antonio_Salieri.mdx";
  slug: "antonio_salieri";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Apalachin_meeting.mdx": {
	id: "Apalachin_meeting.mdx";
  slug: "apalachin_meeting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Apartheid.mdx": {
	id: "Apartheid.mdx";
  slug: "apartheid";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aphex_Twin.mdx": {
	id: "Aphex_Twin.mdx";
  slug: "aphex_twin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Apollo_12.mdx": {
	id: "Apollo_12.mdx";
  slug: "apollo_12";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Apollo_program.mdx": {
	id: "Apollo_program.mdx";
  slug: "apollo_program";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aramoana.mdx": {
	id: "Aramoana.mdx";
  slug: "aramoana";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Aramoana_massacre.mdx": {
	id: "Aramoana_massacre.mdx";
  slug: "aramoana_massacre";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ari_Hoenig.mdx": {
	id: "Ari_Hoenig.mdx";
  slug: "ari_hoenig";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Armando_Diaz.mdx": {
	id: "Armando_Diaz.mdx";
  slug: "armando_diaz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Armero_tragedy.mdx": {
	id: "Armero_tragedy.mdx";
  slug: "armero_tragedy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Art_Malik.mdx": {
	id: "Art_Malik.mdx";
  slug: "art_malik";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Arthur_Nebe.mdx": {
	id: "Arthur_Nebe.mdx";
  slug: "arthur_nebe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Asaph_Hall.mdx": {
	id: "Asaph_Hall.mdx";
  slug: "asaph_hall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ashikaga_Takauji.mdx": {
	id: "Ashikaga_Takauji.mdx";
  slug: "ashikaga_takauji";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Assault_rifle.mdx": {
	id: "Assault_rifle.mdx";
  slug: "assault_rifle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Assizes.mdx": {
	id: "Assizes.mdx";
  slug: "assizes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Astrid_Lindgren.mdx": {
	id: "Astrid_Lindgren.mdx";
  slug: "astrid_lindgren";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Astronomer.mdx": {
	id: "Astronomer.mdx";
  slug: "astronomer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Athens_Polytechnic_uprising.mdx": {
	id: "Athens_Polytechnic_uprising.mdx";
  slug: "athens_polytechnic_uprising";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Augustine_of_Hippo.mdx": {
	id: "Augustine_of_Hippo.mdx";
  slug: "augustine_of_hippo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Australia.mdx": {
	id: "Australia.mdx";
  slug: "australia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Australian_Labor_Party.mdx": {
	id: "Australian_Labor_Party.mdx";
  slug: "australian_labor_party";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Avi_Cohen.mdx": {
	id: "Avi_Cohen.mdx";
  slug: "avi_cohen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Axel_Tuanzebe.mdx": {
	id: "Axel_Tuanzebe.mdx";
  slug: "axel_tuanzebe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ayaan_Hirsi_Ali.mdx": {
	id: "Ayaan_Hirsi_Ali.mdx";
  slug: "ayaan_hirsi_ali";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Babette_Babich.mdx": {
	id: "Babette_Babich.mdx";
  slug: "babette_babich";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Baby_Washington.mdx": {
	id: "Baby_Washington.mdx";
  slug: "baby_washington";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bangladesh.mdx": {
	id: "Bangladesh.mdx";
  slug: "bangladesh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Barbara_Hutton.mdx": {
	id: "Barbara_Hutton.mdx";
  slug: "barbara_hutton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Barlaam_of_Kiev.mdx": {
	id: "Barlaam_of_Kiev.mdx";
  slug: "barlaam_of_kiev";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bart_Cummings.mdx": {
	id: "Bart_Cummings.mdx";
  slug: "bart_cummings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bart_Scott.mdx": {
	id: "Bart_Scott.mdx";
  slug: "bart_scott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Baseball.mdx": {
	id: "Baseball.mdx";
  slug: "baseball";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Britain.mdx": {
	id: "Battle_of_Britain.mdx";
  slug: "battle_of_britain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_El_Herri.mdx": {
	id: "Battle_of_El_Herri.mdx";
  slug: "battle_of_el_herri";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Globe_Tavern.mdx": {
	id: "Battle_of_Globe_Tavern.mdx";
  slug: "battle_of_globe_tavern";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Gravelotte.mdx": {
	id: "Battle_of_Gravelotte.mdx";
  slug: "battle_of_gravelotte";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Ia_Drang.mdx": {
	id: "Battle_of_Ia_Drang.mdx";
  slug: "battle_of_ia_drang";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Long_Tan.mdx": {
	id: "Battle_of_Long_Tan.mdx";
  slug: "battle_of_long_tan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Sheriffmuir.mdx": {
	id: "Battle_of_Sheriffmuir.mdx";
  slug: "battle_of_sheriffmuir";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Shumshu.mdx": {
	id: "Battle_of_Shumshu.mdx";
  slug: "battle_of_shumshu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Smoliani.mdx": {
	id: "Battle_of_Smoliani.mdx";
  slug: "battle_of_smoliani";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battle_of_Turnham_Green.mdx": {
	id: "Battle_of_Turnham_Green.mdx";
  slug: "battle_of_turnham_green";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Battlestar_Galactica.mdx": {
	id: "Battlestar_Galactica.mdx";
  slug: "battlestar_galactica";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ben_Cross.mdx": {
	id: "Ben_Cross.mdx";
  slug: "ben_cross";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bengali_literature.mdx": {
	id: "Bengali_literature.mdx";
  slug: "bengali_literature";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bengalis.mdx": {
	id: "Bengalis.mdx";
  slug: "bengalis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Benjamin_Fondane.mdx": {
	id: "Benjamin_Fondane.mdx";
  slug: "benjamin_fondane";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Benjamin_Kaplan.mdx": {
	id: "Benjamin_Kaplan.mdx";
  slug: "benjamin_kaplan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bennett_Masinga.mdx": {
	id: "Bennett_Masinga.mdx";
  slug: "bennett_masinga";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bennie_Moten.mdx": {
	id: "Bennie_Moten.mdx";
  slug: "bennie_moten";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Benny_Andrews.mdx": {
	id: "Benny_Andrews.mdx";
  slug: "benny_andrews";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Berlin_Wall.mdx": {
	id: "Berlin_Wall.mdx";
  slug: "berlin_wall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bernard_DeVoto.mdx": {
	id: "Bernard_DeVoto.mdx";
  slug: "bernard_devoto";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bernard_Hinault.mdx": {
	id: "Bernard_Hinault.mdx";
  slug: "bernard_hinault";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bessie_Braddock.mdx": {
	id: "Bessie_Braddock.mdx";
  slug: "bessie_braddock";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bharathan.mdx": {
	id: "Bharathan.mdx";
  slug: "bharathan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bill_Britton.mdx": {
	id: "Bill_Britton.mdx";
  slug: "bill_britton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bill_Doggett.mdx": {
	id: "Bill_Doggett.mdx";
  slug: "bill_doggett";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bill_Hemmer.mdx": {
	id: "Bill_Hemmer.mdx";
  slug: "bill_hemmer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Billy_Hughes.mdx": {
	id: "Billy_Hughes.mdx";
  slug: "billy_hughes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Blackwater_Fire_of_1937.mdx": {
	id: "Blackwater_Fire_of_1937.mdx";
  slug: "blackwater_fire_of_1937";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bob_Kennedy.mdx": {
	id: "Bob_Kennedy.mdx";
  slug: "bob_kennedy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bob_Woodruff.mdx": {
	id: "Bob_Woodruff.mdx";
  slug: "bob_woodruff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bobbie_Vaile.mdx": {
	id: "Bobbie_Vaile.mdx";
  slug: "bobbie_vaile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bobby_Doerr.mdx": {
	id: "Bobby_Doerr.mdx";
  slug: "bobby_doerr";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bobby_Manuel.mdx": {
	id: "Bobby_Manuel.mdx";
  slug: "bobby_manuel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Boosie_Badazz.mdx": {
	id: "Boosie_Badazz.mdx";
  slug: "boosie_badazz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Boxing.mdx": {
	id: "Boxing.mdx";
  slug: "boxing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bramwell_Tillsley.mdx": {
	id: "Bramwell_Tillsley.mdx";
  slug: "bramwell_tillsley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brenden_Dillon.mdx": {
	id: "Brenden_Dillon.mdx";
  slug: "brenden_dillon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brett_Baty.mdx": {
	id: "Brett_Baty.mdx";
  slug: "brett_baty";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brett_Lunger.mdx": {
	id: "Brett_Lunger.mdx";
  slug: "brett_lunger";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brian_Aldiss.mdx": {
	id: "Brian_Aldiss.mdx";
  slug: "brian_aldiss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brian_Dietzen.mdx": {
	id: "Brian_Dietzen.mdx";
  slug: "brian_dietzen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brian_Keith.mdx": {
	id: "Brian_Keith.mdx";
  slug: "brian_keith";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brian_Michael_Bendis.mdx": {
	id: "Brian_Michael_Bendis.mdx";
  slug: "brian_michael_bendis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brice_of_Tours.mdx": {
	id: "Brice_of_Tours.mdx";
  slug: "brice_of_tours";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"British_Broadcasting_Company.mdx": {
	id: "British_Broadcasting_Company.mdx";
  slug: "british_broadcasting_company";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"British_Empire.mdx": {
	id: "British_Empire.mdx";
  slug: "british_empire";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brock_Pierce.mdx": {
	id: "Brock_Pierce.mdx";
  slug: "brock_pierce";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brojen_Das.mdx": {
	id: "Brojen_Das.mdx";
  slug: "brojen_das";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brook_Taylor.mdx": {
	id: "Brook_Taylor.mdx";
  slug: "brook_taylor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Brooke_Satchwell.mdx": {
	id: "Brooke_Satchwell.mdx";
  slug: "brooke_satchwell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bruce_Benedict.mdx": {
	id: "Bruce_Benedict.mdx";
  slug: "bruce_benedict";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bruce_Forsyth.mdx": {
	id: "Bruce_Forsyth.mdx";
  slug: "bruce_forsyth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bruno_Maderna.mdx": {
	id: "Bruno_Maderna.mdx";
  slug: "bruno_maderna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bryan_Ruiz.mdx": {
	id: "Bryan_Ruiz.mdx";
  slug: "bryan_ruiz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Buckwheat_Zydeco.mdx": {
	id: "Buckwheat_Zydeco.mdx";
  slug: "buckwheat_zydeco";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Bud_Yorkin.mdx": {
	id: "Bud_Yorkin.mdx";
  slug: "bud_yorkin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Buddy_Killen.mdx": {
	id: "Buddy_Killen.mdx";
  slug: "buddy_killen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Burleigh_Grimes.mdx": {
	id: "Burleigh_Grimes.mdx";
  slug: "burleigh_grimes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Butch_Walker.mdx": {
	id: "Butch_Walker.mdx";
  slug: "butch_walker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Calendar_of_saints.mdx": {
	id: "Calendar_of_saints.mdx";
  slug: "calendar_of_saints";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cameron_White.mdx": {
	id: "Cameron_White.mdx";
  slug: "cameron_white";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Camille_Pissarro.mdx": {
	id: "Camille_Pissarro.mdx";
  slug: "camille_pissarro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Canadian_Armed_Forces.mdx": {
	id: "Canadian_Armed_Forces.mdx";
  slug: "canadian_armed_forces";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Caracas.mdx": {
	id: "Caracas.mdx";
  slug: "caracas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carey_Bell.mdx": {
	id: "Carey_Bell.mdx";
  slug: "carey_bell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carl_Flesch.mdx": {
	id: "Carl_Flesch.mdx";
  slug: "carl_flesch";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carl_Hayman.mdx": {
	id: "Carl_Hayman.mdx";
  slug: "carl_hayman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carl_Hoeft.mdx": {
	id: "Carl_Hoeft.mdx";
  slug: "carl_hoeft";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carl_Rungius.mdx": {
	id: "Carl_Rungius.mdx";
  slug: "carl_rungius";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carl_Wayne.mdx": {
	id: "Carl_Wayne.mdx";
  slug: "carl_wayne";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carlos_Delgado_Chalbaud.mdx": {
	id: "Carlos_Delgado_Chalbaud.mdx";
  slug: "carlos_delgado_chalbaud";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carmelites.mdx": {
	id: "Carmelites.mdx";
  slug: "carmelites";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Carole_Bouquet.mdx": {
	id: "Carole_Bouquet.mdx";
  slug: "carole_bouquet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Caroline_Goodall.mdx": {
	id: "Caroline_Goodall.mdx";
  slug: "caroline_goodall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Caspar_Weinberger.mdx": {
	id: "Caspar_Weinberger.mdx";
  slug: "caspar_weinberger";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cassius_Stanley.mdx": {
	id: "Cassius_Stanley.mdx";
  slug: "cassius_stanley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Catherine_McGuinness.mdx": {
	id: "Catherine_McGuinness.mdx";
  slug: "catherine_mcguinness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Catholic_Church.mdx": {
	id: "Catholic_Church.mdx";
  slug: "catholic_church";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cavalier.mdx": {
	id: "Cavalier.mdx";
  slug: "cavalier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cecilie_Thoresen_Krog.mdx": {
	id: "Cecilie_Thoresen_Krog.mdx";
  slug: "cecilie_thoresen_krog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Central_London.mdx": {
	id: "Central_London.mdx";
  slug: "central_london";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cesar_Climaco.mdx": {
	id: "Cesar_Climaco.mdx";
  slug: "cesar_climaco";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Carroll_of_Carrollton.mdx": {
	id: "Charles_Carroll_of_Carrollton.mdx";
  slug: "charles_carroll_of_carrollton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Hazlewood.mdx": {
	id: "Charles_Hazlewood.mdx";
  slug: "charles_hazlewood";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Hylton_Stewart.mdx": {
	id: "Charles_Hylton_Stewart.mdx";
  slug: "charles_hylton_stewart";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_III.mdx": {
	id: "Charles_III.mdx";
  slug: "charles_iii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_II_of_England.mdx": {
	id: "Charles_II_of_England.mdx";
  slug: "charles_ii_of_england";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Lafontaine.mdx": {
	id: "Charles_Lafontaine.mdx";
  slug: "charles_lafontaine";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Lyell.mdx": {
	id: "Charles_Lyell.mdx";
  slug: "charles_lyell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Simeon.mdx": {
	id: "Charles_Simeon.mdx";
  slug: "charles_simeon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charles_Simon_Favart.mdx": {
	id: "Charles_Simon_Favart.mdx";
  slug: "charles_simon_favart";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Charlotte_Coleman.mdx": {
	id: "Charlotte_Coleman.mdx";
  slug: "charlotte_coleman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Chauncey_Goodrich.mdx": {
	id: "Chauncey_Goodrich.mdx";
  slug: "chauncey_goodrich";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Che_Yaoxian.mdx": {
	id: "Che_Yaoxian.mdx";
  slug: "che_yaoxian";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Chelsea_Wolfe.mdx": {
	id: "Chelsea_Wolfe.mdx";
  slug: "chelsea_wolfe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Chieko_Aioi.mdx": {
	id: "Chieko_Aioi.mdx";
  slug: "chieko_aioi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"China_Northern_Airlines_Flight_6901.mdx": {
	id: "China_Northern_Airlines_Flight_6901.mdx";
  slug: "china_northern_airlines_flight_6901";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Chris_Noth.mdx": {
	id: "Chris_Noth.mdx";
  slug: "chris_noth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Christian_Slater.mdx": {
	id: "Christian_Slater.mdx";
  slug: "christian_slater";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Chrysler.mdx": {
	id: "Chrysler.mdx";
  slug: "chrysler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Church_of_England.mdx": {
	id: "Church_of_England.mdx";
  slug: "church_of_england";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cisco_Houston.mdx": {
	id: "Cisco_Houston.mdx";
  slug: "cisco_houston";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Civil_rights_movement.mdx": {
	id: "Civil_rights_movement.mdx";
  slug: "civil_rights_movement";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Clairo.mdx": {
	id: "Clairo.mdx";
  slug: "clairo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Clare_of_Montefalco.mdx": {
	id: "Clare_of_Montefalco.mdx";
  slug: "clare_of_montefalco";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Claude_Monet.mdx": {
	id: "Claude_Monet.mdx";
  slug: "claude_monet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Clemente_Biondetti.mdx": {
	id: "Clemente_Biondetti.mdx";
  slug: "clemente_biondetti";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Colombia.mdx": {
	id: "Colombia.mdx";
  slug: "colombia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Comet.mdx": {
	id: "Comet.mdx";
  slug: "comet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Commonwealth_of_Nations.mdx": {
	id: "Commonwealth_of_Nations.mdx";
  slug: "commonwealth_of_nations";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Communist_Party_of_Spain.mdx": {
	id: "Communist_Party_of_Spain.mdx";
  slug: "communist_party_of_spain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Condoleezza_Rice.mdx": {
	id: "Condoleezza_Rice.mdx";
  slug: "condoleezza_rice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Confederate_States_of_America.mdx": {
	id: "Confederate_States_of_America.mdx";
  slug: "confederate_states_of_america";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Congress_of_Colombia.mdx": {
	id: "Congress_of_Colombia.mdx";
  slug: "congress_of_colombia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Conscription_in_Australia.mdx": {
	id: "Conscription_in_Australia.mdx";
  slug: "conscription_in_australia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cornelius_Warmerdam.mdx": {
	id: "Cornelius_Warmerdam.mdx";
  slug: "cornelius_warmerdam";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cornell_Gunter.mdx": {
	id: "Cornell_Gunter.mdx";
  slug: "cornell_gunter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cory_Michael_Smith.mdx": {
	id: "Cory_Michael_Smith.mdx";
  slug: "cory_michael_smith";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Countess_Charlotte_Flandrina_of_Nassau.mdx": {
	id: "Countess_Charlotte_Flandrina_of_Nassau.mdx";
  slug: "countess_charlotte_flandrina_of_nassau";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"County_of_Flanders.mdx": {
	id: "County_of_Flanders.mdx";
  slug: "county_of_flanders";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Courtney_Johns.mdx": {
	id: "Courtney_Johns.mdx";
  slug: "courtney_johns";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Coventry_Blitz.mdx": {
	id: "Coventry_Blitz.mdx";
  slug: "coventry_blitz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Coventry_Cathedral.mdx": {
	id: "Coventry_Cathedral.mdx";
  slug: "coventry_cathedral";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Craig_Bierko.mdx": {
	id: "Craig_Bierko.mdx";
  slug: "craig_bierko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cuba.mdx": {
	id: "Cuba.mdx";
  slug: "cuba";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Curtiss_Model_D.mdx": {
	id: "Curtiss_Model_D.mdx";
  slug: "curtiss_model_d";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cyclone_Forrest.mdx": {
	id: "Cyclone_Forrest.mdx";
  slug: "cyclone_forrest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Cyril_Lucaris.mdx": {
	id: "Cyril_Lucaris.mdx";
  slug: "cyril_lucaris";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Czechoslovakia.mdx": {
	id: "Czechoslovakia.mdx";
  slug: "czechoslovakia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dack_Rambo.mdx": {
	id: "Dack_Rambo.mdx";
  slug: "dack_rambo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Daig.mdx": {
	id: "Daig.mdx";
  slug: "daig";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Daler_Mehndi.mdx": {
	id: "Daler_Mehndi.mdx";
  slug: "daler_mehndi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dana_Stubblefield.mdx": {
	id: "Dana_Stubblefield.mdx";
  slug: "dana_stubblefield";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dana_Vollmer.mdx": {
	id: "Dana_Vollmer.mdx";
  slug: "dana_vollmer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Danielle_Page.mdx": {
	id: "Danielle_Page.mdx";
  slug: "danielle_page";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dave_Mackay.mdx": {
	id: "Dave_Mackay.mdx";
  slug: "dave_mackay";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"David_Auradou.mdx": {
	id: "David_Auradou.mdx";
  slug: "david_auradou";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"David_Marshall_Williams.mdx": {
	id: "David_Marshall_Williams.mdx";
  slug: "david_marshall_williams";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"David_Moscow.mdx": {
	id: "David_Moscow.mdx";
  slug: "david_moscow";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"David_Peakall.mdx": {
	id: "David_Peakall.mdx";
  slug: "david_peakall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dawson_Knox.mdx": {
	id: "Dawson_Knox.mdx";
  slug: "dawson_knox";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"DeVonta_Smith.mdx": {
	id: "DeVonta_Smith.mdx";
  slug: "devonta_smith";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dean_Riesner.mdx": {
	id: "Dean_Riesner.mdx";
  slug: "dean_riesner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Decentius.mdx": {
	id: "Decentius.mdx";
  slug: "decentius";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Denis_Edozie.mdx": {
	id: "Denis_Edozie.mdx";
  slug: "denis_edozie";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Denis_Leary.mdx": {
	id: "Denis_Leary.mdx";
  slug: "denis_leary";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dennis_Elliott.mdx": {
	id: "Dennis_Elliott.mdx";
  slug: "dennis_elliott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Denny_Party.mdx": {
	id: "Denny_Party.mdx";
  slug: "denny_party";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Deputy_Prime_Minister_of_the_Netherlands.mdx": {
	id: "Deputy_Prime_Minister_of_the_Netherlands.mdx";
  slug: "deputy_prime_minister_of_the_netherlands";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Devolution_in_the_United_Kingdom.mdx": {
	id: "Devolution_in_the_United_Kingdom.mdx";
  slug: "devolution_in_the_united_kingdom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Devon_Bostick.mdx": {
	id: "Devon_Bostick.mdx";
  slug: "devon_bostick";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dick_Powell.mdx": {
	id: "Dick_Powell.mdx";
  slug: "dick_powell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Didier_Auriol.mdx": {
	id: "Didier_Auriol.mdx";
  slug: "didier_auriol";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dietrich_v_The_Queen.mdx": {
	id: "Dietrich_v_The_Queen.mdx";
  slug: "dietrich_v_the_queen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dimitra_Galani.mdx": {
	id: "Dimitra_Galani.mdx";
  slug: "dimitra_galani";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dimitrios_Hatzis.mdx": {
	id: "Dimitrios_Hatzis.mdx";
  slug: "dimitrios_hatzis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dimitris_Psathas.mdx": {
	id: "Dimitris_Psathas.mdx";
  slug: "dimitris_psathas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dimitris_Salpingidis.mdx": {
	id: "Dimitris_Salpingidis.mdx";
  slug: "dimitris_salpingidis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dobruja_Day.mdx": {
	id: "Dobruja_Day.mdx";
  slug: "dobruja_day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dominique_de_Villepin.mdx": {
	id: "Dominique_de_Villepin.mdx";
  slug: "dominique_de_villepin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Don_Lane.mdx": {
	id: "Don_Lane.mdx";
  slug: "don_lane";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Don_Pardo.mdx": {
	id: "Don_Pardo.mdx";
  slug: "don_pardo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dorothea_Erxleben.mdx": {
	id: "Dorothea_Erxleben.mdx";
  slug: "dorothea_erxleben";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dougie_Payne.mdx": {
	id: "Dougie_Payne.mdx";
  slug: "dougie_payne";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dubricius.mdx": {
	id: "Dubricius.mdx";
  slug: "dubricius";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dwarf_planet.mdx": {
	id: "Dwarf_planet.mdx";
  slug: "dwarf_planet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Dylan_Napa.mdx": {
	id: "Dylan_Napa.mdx";
  slug: "dylan_napa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ea_Jansen.mdx": {
	id: "Ea_Jansen.mdx";
  slug: "ea_jansen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"East_Pakistan.mdx": {
	id: "East_Pakistan.mdx";
  slug: "east_pakistan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eastern_Orthodox_Church.mdx": {
	id: "Eastern_Orthodox_Church.mdx";
  slug: "eastern_orthodox_church";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eberhard_Diepgen.mdx": {
	id: "Eberhard_Diepgen.mdx";
  slug: "eberhard_diepgen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eddie_Arcaro.mdx": {
	id: "Eddie_Arcaro.mdx";
  slug: "eddie_arcaro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eddie_Bracken.mdx": {
	id: "Eddie_Bracken.mdx";
  slug: "eddie_bracken";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eddie_Guerrero.mdx": {
	id: "Eddie_Guerrero.mdx";
  slug: "eddie_guerrero";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edgar_Faure.mdx": {
	id: "Edgar_Faure.mdx";
  slug: "edgar_faure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edward_Adelbert_Doisy.mdx": {
	id: "Edward_Adelbert_Doisy.mdx";
  slug: "edward_adelbert_doisy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edward_Buzzell.mdx": {
	id: "Edward_Buzzell.mdx";
  slug: "edward_buzzell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edward_III_of_England.mdx": {
	id: "Edward_III_of_England.mdx";
  slug: "edward_iii_of_england";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edward_Norton.mdx": {
	id: "Edward_Norton.mdx";
  slug: "edward_norton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Edwin_Booth.mdx": {
	id: "Edwin_Booth.mdx";
  slug: "edwin_booth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Elayne_Boosler.mdx": {
	id: "Elayne_Boosler.mdx";
  slug: "elayne_boosler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Elena_Nikolaidi.mdx": {
	id: "Elena_Nikolaidi.mdx";
  slug: "elena_nikolaidi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eli_Whitney_Blake.mdx": {
	id: "Eli_Whitney_Blake.mdx";
  slug: "eli_whitney_blake";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eliel_Saarinen.mdx": {
	id: "Eliel_Saarinen.mdx";
  slug: "eliel_saarinen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eliseo_Salazar.mdx": {
	id: "Eliseo_Salazar.mdx";
  slug: "eliseo_salazar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Elizabeth_Beisel.mdx": {
	id: "Elizabeth_Beisel.mdx";
  slug: "elizabeth_beisel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Elmer_Bernstein.mdx": {
	id: "Elmer_Bernstein.mdx";
  slug: "elmer_bernstein";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Emma_Raducanu.mdx": {
	id: "Emma_Raducanu.mdx";
  slug: "emma_raducanu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Emperor_Taizu_of_Song.mdx": {
	id: "Emperor_Taizu_of_Song.mdx";
  slug: "emperor_taizu_of_song";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Empress_Genmei.mdx": {
	id: "Empress_Genmei.mdx";
  slug: "empress_genmei";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"English_Channel.mdx": {
	id: "English_Channel.mdx";
  slug: "english_channel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Enoch_Light.mdx": {
	id: "Enoch_Light.mdx";
  slug: "enoch_light";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Enzo_Cucchi.mdx": {
	id: "Enzo_Cucchi.mdx";
  slug: "enzo_cucchi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eric_Malpass.mdx": {
	id: "Eric_Malpass.mdx";
  slug: "eric_malpass";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eric_VI_of_Denmark.mdx": {
	id: "Eric_VI_of_Denmark.mdx";
  slug: "eric_vi_of_denmark";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ernest_MacMillan.mdx": {
	id: "Ernest_MacMillan.mdx";
  slug: "ernest_macmillan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ernest_Noel.mdx": {
	id: "Ernest_Noel.mdx";
  slug: "ernest_noel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ernst_Happel.mdx": {
	id: "Ernst_Happel.mdx";
  slug: "ernst_happel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ernst_Nolte.mdx": {
	id: "Ernst_Nolte.mdx";
  slug: "ernst_nolte";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Erwin_Schulhoff.mdx": {
	id: "Erwin_Schulhoff.mdx";
  slug: "erwin_schulhoff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Esteban_Cambiasso.mdx": {
	id: "Esteban_Cambiasso.mdx";
  slug: "esteban_cambiasso";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eugene_Burton_Ely.mdx": {
	id: "Eugene_Burton_Ely.mdx";
  slug: "eugene_burton_ely";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eugene_Dynkin.mdx": {
	id: "Eugene_Dynkin.mdx";
  slug: "eugene_dynkin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eugenius_II_of_Toledo.mdx": {
	id: "Eugenius_II_of_Toledo.mdx";
  slug: "eugenius_ii_of_toledo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"European_Union.mdx": {
	id: "European_Union.mdx";
  slug: "european_union";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Eva_Zeisel.mdx": {
	id: "Eva_Zeisel.mdx";
  slug: "eva_zeisel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Evan_Gattis.mdx": {
	id: "Evan_Gattis.mdx";
  slug: "evan_gattis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Even_Kruse_Skatrud.mdx": {
	id: "Even_Kruse_Skatrud.mdx";
  slug: "even_kruse_skatrud";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Everlast.mdx": {
	id: "Everlast.mdx";
  slug: "everlast";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Executive_Order_12170.mdx": {
	id: "Executive_Order_12170.mdx";
  slug: "executive_order_12170";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Executive_order.mdx": {
	id: "Executive_order.mdx";
  slug: "executive_order";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Exile.mdx": {
	id: "Exile.mdx";
  slug: "exile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Exxon_Valdez_oil_spill.mdx": {
	id: "Exxon_Valdez_oil_spill.mdx";
  slug: "exxon_valdez_oil_spill";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fanny_Mendelssohn.mdx": {
	id: "Fanny_Mendelssohn.mdx";
  slug: "fanny_mendelssohn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fat_Lever.mdx": {
	id: "Fat_Lever.mdx";
  slug: "fat_lever";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fatah.mdx": {
	id: "Fatah.mdx";
  slug: "fatah";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Femina_Miss_India.mdx": {
	id: "Femina_Miss_India.mdx";
  slug: "femina_miss_india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ferdinand_Marcos.mdx": {
	id: "Ferdinand_Marcos.mdx";
  slug: "ferdinand_marcos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Finland.mdx": {
	id: "Finland.mdx";
  slug: "finland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"First_English_Civil_War.mdx": {
	id: "First_English_Civil_War.mdx";
  slug: "first_english_civil_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"First_Nations_in_Canada.mdx": {
	id: "First_Nations_in_Canada.mdx";
  slug: "first_nations_in_canada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Flora_Tristan.mdx": {
	id: "Flora_Tristan.mdx";
  slug: "flora_tristan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Florus_and_Laurus.mdx": {
	id: "Florus_and_Laurus.mdx";
  slug: "florus_and_laurus";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"France.mdx": {
	id: "France.mdx";
  slug: "france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"France_national_rugby_league_team.mdx": {
	id: "France_national_rugby_league_team.mdx";
  slug: "france_national_rugby_league_team";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frances_Bean_Cobain.mdx": {
	id: "Frances_Bean_Cobain.mdx";
  slug: "frances_bean_cobain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frances_Xavier_Cabrini.mdx": {
	id: "Frances_Xavier_Cabrini.mdx";
  slug: "frances_xavier_cabrini";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Francesco_Canova_da_Milano.mdx": {
	id: "Francesco_Canova_da_Milano.mdx";
  slug: "francesco_canova_da_milano";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Francis_Raymond_Shea.mdx": {
	id: "Francis_Raymond_Shea.mdx";
  slug: "francis_raymond_shea";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Francisco_Lindor.mdx": {
	id: "Francisco_Lindor.mdx";
  slug: "francisco_lindor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Franco_Cortese.mdx": {
	id: "Franco_Cortese.mdx";
  slug: "franco_cortese";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frank_Salemme.mdx": {
	id: "Frank_Salemme.mdx";
  slug: "frank_salemme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Franz_Joseph_I_of_Austria.mdx": {
	id: "Franz_Joseph_I_of_Austria.mdx";
  slug: "franz_joseph_i_of_austria";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fred_Haise.mdx": {
	id: "Fred_Haise.mdx";
  slug: "fred_haise";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fred_Phelps.mdx": {
	id: "Fred_Phelps.mdx";
  slug: "fred_phelps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Freddie_Garrity.mdx": {
	id: "Freddie_Garrity.mdx";
  slug: "freddie_garrity";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frederick_Banting.mdx": {
	id: "Frederick_Banting.mdx";
  slug: "frederick_banting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frederick_Jackson_Turner.mdx": {
	id: "Frederick_Jackson_Turner.mdx";
  slug: "frederick_jackson_turner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Frederick_of_Isenberg.mdx": {
	id: "Frederick_of_Isenberg.mdx";
  slug: "frederick_of_isenberg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Friedrich_Wilhelm_Zachow.mdx": {
	id: "Friedrich_Wilhelm_Zachow.mdx";
  slug: "friedrich_wilhelm_zachow";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Fujiwara_no_Kamatari.mdx": {
	id: "Fujiwara_no_Kamatari.mdx";
  slug: "fujiwara_no_kamatari";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gail_Fisher.mdx": {
	id: "Gail_Fisher.mdx";
  slug: "gail_fisher";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ganges_Delta.mdx": {
	id: "Ganges_Delta.mdx";
  slug: "ganges_delta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Garry_Marshall.mdx": {
	id: "Garry_Marshall.mdx";
  slug: "garry_marshall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gary_Grubbs.mdx": {
	id: "Gary_Grubbs.mdx";
  slug: "gary_grubbs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gary_Vaynerchuk.mdx": {
	id: "Gary_Vaynerchuk.mdx";
  slug: "gary_vaynerchuk";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gaza_Strip.mdx": {
	id: "Gaza_Strip.mdx";
  slug: "gaza_strip";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gene_Anthony_Ray.mdx": {
	id: "Gene_Anthony_Ray.mdx";
  slug: "gene_anthony_ray";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"General_of_The_Salvation_Army.mdx": {
	id: "General_of_The_Salvation_Army.mdx";
  slug: "general_of_the_salvation_army";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Geoff_Courtnall.mdx": {
	id: "Geoff_Courtnall.mdx";
  slug: "geoff_courtnall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Georg_Wilhelm_Friedrich_Hegel.mdx": {
	id: "Georg_Wilhelm_Friedrich_Hegel.mdx";
  slug: "georg_wilhelm_friedrich_hegel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Georg_Wilhelm_Steller.mdx": {
	id: "Georg_Wilhelm_Steller.mdx";
  slug: "georg_wilhelm_steller";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"George_Carey.mdx": {
	id: "George_Carey.mdx";
  slug: "george_carey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"George_Grenville.mdx": {
	id: "George_Grenville.mdx";
  slug: "george_grenville";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"George_Whitefield_Chadwick.mdx": {
	id: "George_Whitefield_Chadwick.mdx";
  slug: "george_whitefield_chadwick";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Georgian_Orthodox_Church.mdx": {
	id: "Georgian_Orthodox_Church.mdx";
  slug: "georgian_orthodox_church";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gerard_Butler.mdx": {
	id: "Gerard_Butler.mdx";
  slug: "gerard_butler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"German_reunification.mdx": {
	id: "German_reunification.mdx";
  slug: "german_reunification";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Germany.mdx": {
	id: "Germany.mdx";
  slug: "germany";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gertrude_Olmstead.mdx": {
	id: "Gertrude_Olmstead.mdx";
  slug: "gertrude_olmstead";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gianni_Rivera.mdx": {
	id: "Gianni_Rivera.mdx";
  slug: "gianni_rivera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gil_Whitney.mdx": {
	id: "Gil_Whitney.mdx";
  slug: "gil_whitney";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gilbert_Perreault.mdx": {
	id: "Gilbert_Perreault.mdx";
  slug: "gilbert_perreault";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gioachino_Rossini.mdx": {
	id: "Gioachino_Rossini.mdx";
  slug: "gioachino_rossini";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Giovanni_Artusi.mdx": {
	id: "Giovanni_Artusi.mdx";
  slug: "giovanni_artusi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Giovanni_Reyna.mdx": {
	id: "Giovanni_Reyna.mdx";
  slug: "giovanni_reyna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Giovanni_della_Casa.mdx": {
	id: "Giovanni_della_Casa.mdx";
  slug: "giovanni_della_casa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Girolamo_Mercuriale.mdx": {
	id: "Girolamo_Mercuriale.mdx";
  slug: "girolamo_mercuriale";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Glacier.mdx": {
	id: "Glacier.mdx";
  slug: "glacier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Godfrey_Evans.mdx": {
	id: "Godfrey_Evans.mdx";
  slug: "godfrey_evans";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gordon_Faber.mdx": {
	id: "Gordon_Faber.mdx";
  slug: "gordon_faber";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gottfried_Kirch.mdx": {
	id: "Gottfried_Kirch.mdx";
  slug: "gottfried_kirch";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Governor_of_Maryland.mdx": {
	id: "Governor_of_Maryland.mdx";
  slug: "governor_of_maryland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Governor_of_Minnesota.mdx": {
	id: "Governor_of_Minnesota.mdx";
  slug: "governor_of_minnesota";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Governor_of_Texas.mdx": {
	id: "Governor_of_Texas.mdx";
  slug: "governor_of_texas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Graham_Patrick_Martin.mdx": {
	id: "Graham_Patrick_Martin.mdx";
  slug: "graham_patrick_martin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Grammar.mdx": {
	id: "Grammar.mdx";
  slug: "grammar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Grand_Duchy_of_Finland.mdx": {
	id: "Grand_Duchy_of_Finland.mdx";
  slug: "grand_duchy_of_finland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Great_Britain_national_rugby_league_team.mdx": {
	id: "Great_Britain_national_rugby_league_team.mdx";
  slug: "great_britain_national_rugby_league_team";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Great_Comet_of_1680.mdx": {
	id: "Great_Comet_of_1680.mdx";
  slug: "great_comet_of_1680";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Great_Internet_Mersenne_Prime_Search.mdx": {
	id: "Great_Internet_Mersenne_Prime_Search.mdx";
  slug: "great_internet_mersenne_prime_search";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Great_Purge.mdx": {
	id: "Great_Purge.mdx";
  slug: "great_purge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Great_Thessaloniki_Fire_of_1917.mdx": {
	id: "Great_Thessaloniki_Fire_of_1917.mdx";
  slug: "great_thessaloniki_fire_of_1917";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Greg_Abbott.mdx": {
	id: "Greg_Abbott.mdx";
  slug: "greg_abbott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gregorio_del_Pilar.mdx": {
	id: "Gregorio_del_Pilar.mdx";
  slug: "gregorio_del_pilar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gregory_Palamas.mdx": {
	id: "Gregory_Palamas.mdx";
  slug: "gregory_palamas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guandu_Bridge.mdx": {
	id: "Guandu_Bridge.mdx";
  slug: "guandu_bridge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guangxu_Emperor.mdx": {
	id: "Guangxu_Emperor.mdx";
  slug: "guangxu_emperor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guantanamo_Bay_Naval_Base.mdx": {
	id: "Guantanamo_Bay_Naval_Base.mdx";
  slug: "guantanamo_bay_naval_base";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guido_Reni.mdx": {
	id: "Guido_Reni.mdx";
  slug: "guido_reni";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guillermina_Bravo.mdx": {
	id: "Guillermina_Bravo.mdx";
  slug: "guillermina_bravo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Guillermo_Moscoso.mdx": {
	id: "Guillermo_Moscoso.mdx";
  slug: "guillermo_moscoso";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gulzar.mdx": {
	id: "Gulzar.mdx";
  slug: "gulzar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gunhilde.mdx": {
	id: "Gunhilde.mdx";
  slug: "gunhilde";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gunter_Sachs.mdx": {
	id: "Gunter_Sachs.mdx";
  slug: "gunter_sachs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gustavo_Charif.mdx": {
	id: "Gustavo_Charif.mdx";
  slug: "gustavo_charif";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Gwen_Ifill.mdx": {
	id: "Gwen_Ifill.mdx";
  slug: "gwen_ifill";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hal_Connolly.mdx": {
	id: "Hal_Connolly.mdx";
  slug: "hal_connolly";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hamas.mdx": {
	id: "Hamas.mdx";
  slug: "hamas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hamdan_bin_Mohammed_Al_Maktoum.mdx": {
	id: "Hamdan_bin_Mohammed_Al_Maktoum.mdx";
  slug: "hamdan_bin_mohammed_al_maktoum";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hampton_Hawes.mdx": {
	id: "Hampton_Hawes.mdx";
  slug: "hampton_hawes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hampton_Roads.mdx": {
	id: "Hampton_Roads.mdx";
  slug: "hampton_roads";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hans_van_Mierlo.mdx": {
	id: "Hans_van_Mierlo.mdx";
  slug: "hans_van_mierlo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hari_Krishna_Devsare.mdx": {
	id: "Hari_Krishna_Devsare.mdx";
  slug: "hari_krishna_devsare";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harland_Williams.mdx": {
	id: "Harland_Williams.mdx";
  slug: "harland_williams";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harold_Haley.mdx": {
	id: "Harold_Haley.mdx";
  slug: "harold_haley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harold_Larwood.mdx": {
	id: "Harold_Larwood.mdx";
  slug: "harold_larwood";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harrison_Begay.mdx": {
	id: "Harrison_Begay.mdx";
  slug: "harrison_begay";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harry_Hughes.mdx": {
	id: "Harry_Hughes.mdx";
  slug: "harry_hughes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harry_Hurt_III.mdx": {
	id: "Harry_Hurt_III.mdx";
  slug: "harry_hurt_iii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Harun_Babunagari.mdx": {
	id: "Harun_Babunagari.mdx";
  slug: "harun_babunagari";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hatsune_Matsushima.mdx": {
	id: "Hatsune_Matsushima.mdx";
  slug: "hatsune_matsushima";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hawaii.mdx": {
	id: "Hawaii.mdx";
  slug: "hawaii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hawaii_Marriage_Equality_Act.mdx": {
	id: "Hawaii_Marriage_Equality_Act.mdx";
  slug: "hawaii_marriage_equality_act";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Helen_Dettweiler.mdx": {
	id: "Helen_Dettweiler.mdx";
  slug: "helen_dettweiler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Helena_Carroll.mdx": {
	id: "Helena_Carroll.mdx";
  slug: "helena_carroll";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Helium.mdx": {
	id: "Helium.mdx";
  slug: "helium";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Helsinki.mdx": {
	id: "Helsinki.mdx";
  slug: "helsinki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Henri_Dutrochet.mdx": {
	id: "Henri_Dutrochet.mdx";
  slug: "henri_dutrochet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Henry_Hammond.mdx": {
	id: "Henry_Hammond.mdx";
  slug: "henry_hammond";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Henry_IV_of_France.mdx": {
	id: "Henry_IV_of_France.mdx";
  slug: "henry_iv_of_france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Henry_Strangways.mdx": {
	id: "Henry_Strangways.mdx";
  slug: "henry_strangways";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Herman_Berlinski.mdx": {
	id: "Herman_Berlinski.mdx";
  slug: "herman_berlinski";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Herman_Melville.mdx": {
	id: "Herman_Melville.mdx";
  slug: "herman_melville";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hermione_Baddeley.mdx": {
	id: "Hermione_Baddeley.mdx";
  slug: "hermione_baddeley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Heydar_Aliyev_International_Airport.mdx": {
	id: "Heydar_Aliyev_International_Airport.mdx";
  slug: "heydar_aliyev_international_airport";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hifikepunye_Pohamba.mdx": {
	id: "Hifikepunye_Pohamba.mdx";
  slug: "hifikepunye_pohamba";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"High_Court_of_Australia.mdx": {
	id: "High_Court_of_Australia.mdx";
  slug: "high_court_of_australia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hildegard_Trabant.mdx": {
	id: "Hildegard_Trabant.mdx";
  slug: "hildegard_trabant";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hiram_Fong.mdx": {
	id: "Hiram_Fong.mdx";
  slug: "hiram_fong";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hiroshi_Tanahashi.mdx": {
	id: "Hiroshi_Tanahashi.mdx";
  slug: "hiroshi_tanahashi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hobby_Lobby.mdx": {
	id: "Hobby_Lobby.mdx";
  slug: "hobby_lobby";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Holland_Tunnel.mdx": {
	id: "Holland_Tunnel.mdx";
  slug: "holland_tunnel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"House_of_Commons_of_the_United_Kingdom.mdx": {
	id: "House_of_Commons_of_the_United_Kingdom.mdx";
  slug: "house_of_commons_of_the_united_kingdom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Howard_Wilkinson.mdx": {
	id: "Howard_Wilkinson.mdx";
  slug: "howard_wilkinson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Huang_Xiaoming.mdx": {
	id: "Huang_Xiaoming.mdx";
  slug: "huang_xiaoming";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hudson_River.mdx": {
	id: "Hudson_River.mdx";
  slug: "hudson_river";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hugues_Aufray.mdx": {
	id: "Hugues_Aufray.mdx";
  slug: "hugues_aufray";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hugues_Lapointe.mdx": {
	id: "Hugues_Lapointe.mdx";
  slug: "hugues_lapointe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Humayun_Ahmed.mdx": {
	id: "Humayun_Ahmed.mdx";
  slug: "humayun_ahmed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hundred_Thousand_Martyrs_of_Tbilisi.mdx": {
	id: "Hundred_Thousand_Martyrs_of_Tbilisi.mdx";
  slug: "hundred_thousand_martyrs_of_tbilisi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hurricane_Alicia.mdx": {
	id: "Hurricane_Alicia.mdx";
  slug: "hurricane_alicia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hussein_of_Jordan.mdx": {
	id: "Hussein_of_Jordan.mdx";
  slug: "hussein_of_jordan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Hypatius_of_Gangra.mdx": {
	id: "Hypatius_of_Gangra.mdx";
  slug: "hypatius_of_gangra";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"IFA_Berlin.mdx": {
	id: "IFA_Berlin.mdx";
  slug: "ifa_berlin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ibrahim_of_the_Ottoman_Empire.mdx": {
	id: "Ibrahim_of_the_Ottoman_Empire.mdx";
  slug: "ibrahim_of_the_ottoman_empire";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Iceland.mdx": {
	id: "Iceland.mdx";
  slug: "iceland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Idris_Muhammad.mdx": {
	id: "Idris_Muhammad.mdx";
  slug: "idris_muhammad";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ignacio_Comonfort.mdx": {
	id: "Ignacio_Comonfort.mdx";
  slug: "ignacio_comonfort";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ignaz_Pleyel.mdx": {
	id: "Ignaz_Pleyel.mdx";
  slug: "ignaz_pleyel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"India.mdx": {
	id: "India.mdx";
  slug: "india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Indonesia.mdx": {
	id: "Indonesia.mdx";
  slug: "indonesia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Indrek_Zelinski.mdx": {
	id: "Indrek_Zelinski.mdx";
  slug: "indrek_zelinski";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Inge_Dekker.mdx": {
	id: "Inge_Dekker.mdx";
  slug: "inge_dekker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Institute_for_Advanced_Study.mdx": {
	id: "Institute_for_Advanced_Study.mdx";
  slug: "institute_for_advanced_study";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Intelligence_assessment.mdx": {
	id: "Intelligence_assessment.mdx";
  slug: "intelligence_assessment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"International_Civil_Aviation_Organization.mdx": {
	id: "International_Civil_Aviation_Organization.mdx";
  slug: "international_civil_aviation_organization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"International_Society_for_Krishna_Consciousness.mdx": {
	id: "International_Society_for_Krishna_Consciousness.mdx";
  slug: "international_society_for_krishna_consciousness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Internment.mdx": {
	id: "Internment.mdx";
  slug: "internment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Invasion_of_the_Kuril_Islands.mdx": {
	id: "Invasion_of_the_Kuril_Islands.mdx";
  slug: "invasion_of_the_kuril_islands";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Iraq.mdx": {
	id: "Iraq.mdx";
  slug: "iraq";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Iraq_disarmament_crisis.mdx": {
	id: "Iraq_disarmament_crisis.mdx";
  slug: "iraq_disarmament_crisis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Isabella_I_of_Castile.mdx": {
	id: "Isabella_I_of_Castile.mdx";
  slug: "isabella_i_of_castile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Israel.mdx": {
	id: "Israel.mdx";
  slug: "israel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Italian_Army.mdx": {
	id: "Italian_Army.mdx";
  slug: "italian_army";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ivan_II_of_Moscow.mdx": {
	id: "Ivan_II_of_Moscow.mdx";
  slug: "ivan_ii_of_moscow";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Iziaslav_II_of_Kiev.mdx": {
	id: "Iziaslav_II_of_Kiev.mdx";
  slug: "iziaslav_ii_of_kiev";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Elam.mdx": {
	id: "Jack_Elam.mdx";
  slug: "jack_elam";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Finney.mdx": {
	id: "Jack_Finney.mdx";
  slug: "jack_finney";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_George.mdx": {
	id: "Jack_George.mdx";
  slug: "jack_george";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Narz.mdx": {
	id: "Jack_Narz.mdx";
  slug: "jack_narz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Pickersgill.mdx": {
	id: "Jack_Pickersgill.mdx";
  slug: "jack_pickersgill";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Pickford.mdx": {
	id: "Jack_Pickford.mdx";
  slug: "jack_pickford";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jack_Sikma.mdx": {
	id: "Jack_Sikma.mdx";
  slug: "jack_sikma";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jackie_Leven.mdx": {
	id: "Jackie_Leven.mdx";
  slug: "jackie_leven";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jacob_Abbott.mdx": {
	id: "Jacob_Abbott.mdx";
  slug: "jacob_abbott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jacobite_rising_of_1715.mdx": {
	id: "Jacobite_rising_of_1715.mdx";
  slug: "jacobite_rising_of_1715";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jake_Livermore.mdx": {
	id: "Jake_Livermore.mdx";
  slug: "jake_livermore";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jakob_Schaffner.mdx": {
	id: "Jakob_Schaffner.mdx";
  slug: "jakob_schaffner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"James_Bruce.mdx": {
	id: "James_Bruce.mdx";
  slug: "james_bruce";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"James_Mellaart.mdx": {
	id: "James_Mellaart.mdx";
  slug: "james_mellaart";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"James_Meredith.mdx": {
	id: "James_Meredith.mdx";
  slug: "james_meredith";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jamie_Soward.mdx": {
	id: "Jamie_Soward.mdx";
  slug: "jamie_soward";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jan_Zach.mdx": {
	id: "Jan_Zach.mdx";
  slug: "jan_zach";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Janet_Lawson.mdx": {
	id: "Janet_Lawson.mdx";
  slug: "janet_lawson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Janine_Leal.mdx": {
	id: "Janine_Leal.mdx";
  slug: "janine_leal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jason_Furman.mdx": {
	id: "Jason_Furman.mdx";
  slug: "jason_furman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Java.mdx": {
	id: "Java.mdx";
  slug: "java";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jawaharlal_Nehru.mdx": {
	id: "Jawaharlal_Nehru.mdx";
  slug: "jawaharlal_nehru";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jay_Sigel.mdx": {
	id: "Jay_Sigel.mdx";
  slug: "jay_sigel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jean_Bolland.mdx": {
	id: "Jean_Bolland.mdx";
  slug: "jean_bolland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jean_Kahn.mdx": {
	id: "Jean_Kahn.mdx";
  slug: "jean_kahn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jean_Paul.mdx": {
	id: "Jean_Paul.mdx";
  slug: "jean_paul";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jean_Seberg.mdx": {
	id: "Jean_Seberg.mdx";
  slug: "jean_seberg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jeremy_Shockey.mdx": {
	id: "Jeremy_Shockey.mdx";
  slug: "jeremy_shockey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jesse_Robredo.mdx": {
	id: "Jesse_Robredo.mdx";
  slug: "jesse_robredo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jessica_Jacobs.mdx": {
	id: "Jessica_Jacobs.mdx";
  slug: "jessica_jacobs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jiaqing_Emperor.mdx": {
	id: "Jiaqing_Emperor.mdx";
  slug: "jiaqing_emperor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jim_Jeffords.mdx": {
	id: "Jim_Jeffords.mdx";
  slug: "jim_jeffords";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jimmy_Fontana.mdx": {
	id: "Jimmy_Fontana.mdx";
  slug: "jimmy_fontana";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jimmy_Kimmel.mdx": {
	id: "Jimmy_Kimmel.mdx";
  slug: "jimmy_kimmel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jimmy_Piersall.mdx": {
	id: "Jimmy_Piersall.mdx";
  slug: "jimmy_piersall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joe_Mantegna.mdx": {
	id: "Joe_Mantegna.mdx";
  slug: "joe_mantegna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joe_Principe.mdx": {
	id: "Joe_Principe.mdx";
  slug: "joe_principe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joensuu.mdx": {
	id: "Joensuu.mdx";
  slug: "joensuu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joensuu_City_Hall.mdx": {
	id: "Joensuu_City_Hall.mdx";
  slug: "joensuu_city_hall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Johann_Eck.mdx": {
	id: "Johann_Eck.mdx";
  slug: "johann_eck";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Johann_Nepomuk_Hummel.mdx": {
	id: "Johann_Nepomuk_Hummel.mdx";
  slug: "johann_nepomuk_hummel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Anthony_Sydney_Ritson.mdx": {
	id: "John_Anthony_Sydney_Ritson.mdx";
  slug: "john_anthony_sydney_ritson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Balance.mdx": {
	id: "John_Balance.mdx";
  slug: "john_balance";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Bromwich.mdx": {
	id: "John_Bromwich.mdx";
  slug: "john_bromwich";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Chrysostom.mdx": {
	id: "John_Chrysostom.mdx";
  slug: "john_chrysostom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Curwen.mdx": {
	id: "John_Curwen.mdx";
  slug: "john_curwen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Debney.mdx": {
	id: "John_Debney.mdx";
  slug: "john_debney";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Eudes.mdx": {
	id: "John_Eudes.mdx";
  slug: "john_eudes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Grieb.mdx": {
	id: "John_Grieb.mdx";
  slug: "john_grieb";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Henry_Barbee.mdx": {
	id: "John_Henry_Barbee.mdx";
  slug: "john_henry_barbee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Kovatch.mdx": {
	id: "John_Kovatch.mdx";
  slug: "john_kovatch";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_La_Farge.mdx": {
	id: "John_La_Farge.mdx";
  slug: "john_la_farge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Lumsden.mdx": {
	id: "John_Lumsden.mdx";
  slug: "john_lumsden";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Scarlett.mdx": {
	id: "John_Scarlett.mdx";
  slug: "john_scarlett";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"John_Steuart_Curry.mdx": {
	id: "John_Steuart_Curry.mdx";
  slug: "john_steuart_curry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Johnny_Desmond.mdx": {
	id: "Johnny_Desmond.mdx";
  slug: "johnny_desmond";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Johnny_Mack_Brown.mdx": {
	id: "Johnny_Mack_Brown.mdx";
  slug: "johnny_mack_brown";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Johnny_Preston.mdx": {
	id: "Johnny_Preston.mdx";
  slug: "johnny_preston";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joonas_Kokkonen.mdx": {
	id: "Joonas_Kokkonen.mdx";
  slug: "joonas_kokkonen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Jordan_Bridges.mdx": {
	id: "Jordan_Bridges.mdx";
  slug: "jordan_bridges";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Bernardin.mdx": {
	id: "Joseph_Bernardin.mdx";
  slug: "joseph_bernardin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Estrada.mdx": {
	id: "Joseph_Estrada.mdx";
  slug: "joseph_estrada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Goebbels.mdx": {
	id: "Joseph_Goebbels.mdx";
  slug: "joseph_goebbels";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Hooker.mdx": {
	id: "Joseph_Hooker.mdx";
  slug: "joseph_hooker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_McCarthy.mdx": {
	id: "Joseph_McCarthy.mdx";
  slug: "joseph_mccarthy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Pignatelli.mdx": {
	id: "Joseph_Pignatelli.mdx";
  slug: "joseph_pignatelli";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Simmons.mdx": {
	id: "Joseph_Simmons.mdx";
  slug: "joseph_simmons";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Joseph_Stalin.mdx": {
	id: "Joseph_Stalin.mdx";
  slug: "joseph_stalin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Josephine_Langford.mdx": {
	id: "Josephine_Langford.mdx";
  slug: "josephine_langford";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Josh_Duhamel.mdx": {
	id: "Josh_Duhamel.mdx";
  slug: "josh_duhamel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Juan_Alberto_Schiaffino.mdx": {
	id: "Juan_Alberto_Schiaffino.mdx";
  slug: "juan_alberto_schiaffino";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Juan_Carlos_Lorenzo.mdx": {
	id: "Juan_Carlos_Lorenzo.mdx";
  slug: "juan_carlos_lorenzo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Juan_Manuel_de_Rosas.mdx": {
	id: "Juan_Manuel_de_Rosas.mdx";
  slug: "juan_manuel_de_rosas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Juhi_Chawla.mdx": {
	id: "Juhi_Chawla.mdx";
  slug: "juhi_chawla";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Julia_Michaels.mdx": {
	id: "Julia_Michaels.mdx";
  slug: "julia_michaels";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Julie_Manet.mdx": {
	id: "Julie_Manet.mdx";
  slug: "julie_manet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Julien_Lahaut.mdx": {
	id: "Julien_Lahaut.mdx";
  slug: "julien_lahaut";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Junior_Samples.mdx": {
	id: "Junior_Samples.mdx";
  slug: "junior_samples";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Just_Fontaine.mdx": {
	id: "Just_Fontaine.mdx";
  slug: "just_fontaine";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Justinian_I.mdx": {
	id: "Justinian_I.mdx";
  slug: "justinian_i";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kabul.mdx": {
	id: "Kabul.mdx";
  slug: "kabul";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kaduna.mdx": {
	id: "Kaduna.mdx";
  slug: "kaduna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kaduna_International_Airport.mdx": {
	id: "Kaduna_International_Airport.mdx";
  slug: "kaduna_international_airport";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kaisaniemi_Park.mdx": {
	id: "Kaisaniemi_Park.mdx";
  slug: "kaisaniemi_park";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kaitlin_Olson.mdx": {
	id: "Kaitlin_Olson.mdx";
  slug: "kaitlin_olson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kakha_Bendukidze.mdx": {
	id: "Kakha_Bendukidze.mdx";
  slug: "kakha_bendukidze";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kalle_Kriit.mdx": {
	id: "Kalle_Kriit.mdx";
  slug: "kalle_kriit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kamahl.mdx": {
	id: "Kamahl.mdx";
  slug: "kamahl";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Karelian_Autonomous_Soviet_Socialist_Republic.mdx": {
	id: "Karelian_Autonomous_Soviet_Socialist_Republic.mdx";
  slug: "karelian_autonomous_soviet_socialist_republic";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Karen_Armstrong.mdx": {
	id: "Karen_Armstrong.mdx";
  slug: "karen_armstrong";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Karen_Silkwood.mdx": {
	id: "Karen_Silkwood.mdx";
  slug: "karen_silkwood";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Karl_Jatho.mdx": {
	id: "Karl_Jatho.mdx";
  slug: "karl_jatho";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Katherine_Victor.mdx": {
	id: "Katherine_Victor.mdx";
  slug: "katherine_victor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kathleen_Hughes.mdx": {
	id: "Kathleen_Hughes.mdx";
  slug: "kathleen_hughes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kazuhisa_Inao.mdx": {
	id: "Kazuhisa_Inao.mdx";
  slug: "kazuhisa_inao";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kelly_Sotherton.mdx": {
	id: "Kelly_Sotherton.mdx";
  slug: "kelly_sotherton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kelly_Willard.mdx": {
	id: "Kelly_Willard.mdx";
  slug: "kelly_willard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kemi.mdx": {
	id: "Kemi.mdx";
  slug: "kemi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ken_Kearney.mdx": {
	id: "Ken_Kearney.mdx";
  slug: "ken_kearney";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kevin_Bridges.mdx": {
	id: "Kevin_Bridges.mdx";
  slug: "kevin_bridges";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kim_Polese.mdx": {
	id: "Kim_Polese.mdx";
  slug: "kim_polese";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kingdom_of_Aragon.mdx": {
	id: "Kingdom_of_Aragon.mdx";
  slug: "kingdom_of_aragon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kingdom_of_Castile.mdx": {
	id: "Kingdom_of_Castile.mdx";
  slug: "kingdom_of_castile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kingdom_of_France.mdx": {
	id: "Kingdom_of_France.mdx";
  slug: "kingdom_of_france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kingdom_of_Great_Britain.mdx": {
	id: "Kingdom_of_Great_Britain.mdx";
  slug: "kingdom_of_great_britain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Knut_Alvsson.mdx": {
	id: "Knut_Alvsson.mdx";
  slug: "knut_alvsson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kofi_Annan.mdx": {
	id: "Kofi_Annan.mdx";
  slug: "kofi_annan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Konrad_Ernst_Ackermann.mdx": {
	id: "Konrad_Ernst_Ackermann.mdx";
  slug: "konrad_ernst_ackermann";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Korean_axe_murder_incident.mdx": {
	id: "Korean_axe_murder_incident.mdx";
  slug: "korean_axe_murder_incident";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kristin_Hunter.mdx": {
	id: "Kristin_Hunter.mdx";
  slug: "kristin_hunter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kurt_Morath.mdx": {
	id: "Kurt_Morath.mdx";
  slug: "kurt_morath";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Kyle_Orton.mdx": {
	id: "Kyle_Orton.mdx";
  slug: "kyle_orton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lahar.mdx": {
	id: "Lahar.mdx";
  slug: "lahar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lando_Norris.mdx": {
	id: "Lando_Norris.mdx";
  slug: "lando_norris";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lara_Giddings.mdx": {
	id: "Lara_Giddings.mdx";
  slug: "lara_giddings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Las_Vegas.mdx": {
	id: "Las_Vegas.mdx";
  slug: "las_vegas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Laura_San_Giacomo.mdx": {
	id: "Laura_San_Giacomo.mdx";
  slug: "laura_san_giacomo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lauri_Pihkala.mdx": {
	id: "Lauri_Pihkala.mdx";
  slug: "lauri_pihkala";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Laurien_Leurink.mdx": {
	id: "Laurien_Leurink.mdx";
  slug: "laurien_leurink";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lavr_Kornilov.mdx": {
	id: "Lavr_Kornilov.mdx";
  slug: "lavr_kornilov";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lawrie_Barratt.mdx": {
	id: "Lawrie_Barratt.mdx";
  slug: "lawrie_barratt";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lawyer_Milloy.mdx": {
	id: "Lawyer_Milloy.mdx";
  slug: "lawyer_milloy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Learned_Hand.mdx": {
	id: "Learned_Hand.mdx";
  slug: "learned_hand";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leeward_Point_Field.mdx": {
	id: "Leeward_Point_Field.mdx";
  slug: "leeward_point_field";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lefteris_Papadopoulos.mdx": {
	id: "Lefteris_Papadopoulos.mdx";
  slug: "lefteris_papadopoulos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leo_Baekeland.mdx": {
	id: "Leo_Baekeland.mdx";
  slug: "leo_baekeland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leon_Russell.mdx": {
	id: "Leon_Russell.mdx";
  slug: "leon_russell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leonard_Boyle.mdx": {
	id: "Leonard_Boyle.mdx";
  slug: "leonard_boyle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leonid_Kogan.mdx": {
	id: "Leonid_Kogan.mdx";
  slug: "leonid_kogan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leopold_Mozart.mdx": {
	id: "Leopold_Mozart.mdx";
  slug: "leopold_mozart";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leopold_Staff.mdx": {
	id: "Leopold_Staff.mdx";
  slug: "leopold_staff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Leszek_Cichy.mdx": {
	id: "Leszek_Cichy.mdx";
  slug: "leszek_cichy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Levente_Lengyel.mdx": {
	id: "Levente_Lengyel.mdx";
  slug: "levente_lengyel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lieutenant_Governor_of_Connecticut.mdx": {
	id: "Lieutenant_Governor_of_Connecticut.mdx";
  slug: "lieutenant_governor_of_connecticut";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lieutenant_commander.mdx": {
	id: "Lieutenant_commander.mdx";
  slug: "lieutenant_commander";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lila_Lee.mdx": {
	id: "Lila_Lee.mdx";
  slug: "lila_lee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Linda_Christian.mdx": {
	id: "Linda_Christian.mdx";
  slug: "linda_christian";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lionel_Simmons.mdx": {
	id: "Lionel_Simmons.mdx";
  slug: "lionel_simmons";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lions_Gate_Bridge.mdx": {
	id: "Lions_Gate_Bridge.mdx";
  slug: "lions_gate_bridge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lisa_De_Vanna.mdx": {
	id: "Lisa_De_Vanna.mdx";
  slug: "lisa_de_vanna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lisa_Otto.mdx": {
	id: "Lisa_Otto.mdx";
  slug: "lisa_otto";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"List_of_deaths_at_the_Berlin_Wall.mdx": {
	id: "List_of_deaths_at_the_Berlin_Wall.mdx";
  slug: "list_of_deaths_at_the_berlin_wall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"List_of_mayors_of_Berlin.mdx": {
	id: "List_of_mayors_of_Berlin.mdx";
  slug: "list_of_mayors_of_berlin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Liviu_Librescu.mdx": {
	id: "Liviu_Librescu.mdx";
  slug: "liviu_librescu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Liz_Cambage.mdx": {
	id: "Liz_Cambage.mdx";
  slug: "liz_cambage";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lolita.mdx": {
	id: "Lolita.mdx";
  slug: "lolita";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lon_Nol.mdx": {
	id: "Lon_Nol.mdx";
  slug: "lon_nol";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"London.mdx": {
	id: "London.mdx";
  slug: "london";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lord_Lieutenant_of_Derbyshire.mdx": {
	id: "Lord_Lieutenant_of_Derbyshire.mdx";
  slug: "lord_lieutenant_of_derbyshire";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lord_Lieutenant_of_Essex.mdx": {
	id: "Lord_Lieutenant_of_Essex.mdx";
  slug: "lord_lieutenant_of_essex";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lorenzo_Pucci.mdx": {
	id: "Lorenzo_Pucci.mdx";
  slug: "lorenzo_pucci";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lori_Berenson.mdx": {
	id: "Lori_Berenson.mdx";
  slug: "lori_berenson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Loudun.mdx": {
	id: "Loudun.mdx";
  slug: "loudun";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louie_Gohmert.mdx": {
	id: "Louie_Gohmert.mdx";
  slug: "louie_gohmert";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louis_Brandeis.mdx": {
	id: "Louis_Brandeis.mdx";
  slug: "louis_brandeis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louis_Nicolas_Vauquelin.mdx": {
	id: "Louis_Nicolas_Vauquelin.mdx";
  slug: "louis_nicolas_vauquelin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louis_Stokes.mdx": {
	id: "Louis_Stokes.mdx";
  slug: "louis_stokes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louis_VII_of_France.mdx": {
	id: "Louis_VII_of_France.mdx";
  slug: "louis_vii_of_france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louis_de_Freycinet.mdx": {
	id: "Louis_de_Freycinet.mdx";
  slug: "louis_de_freycinet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louise_Brooks.mdx": {
	id: "Louise_Brooks.mdx";
  slug: "louise_brooks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louise_Ellman.mdx": {
	id: "Louise_Ellman.mdx";
  slug: "louise_ellman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Louisiana.mdx": {
	id: "Louisiana.mdx";
  slug: "louisiana";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Luc_Montagnier.mdx": {
	id: "Luc_Montagnier.mdx";
  slug: "luc_montagnier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lucas_Barrios.mdx": {
	id: "Lucas_Barrios.mdx";
  slug: "lucas_barrios";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lucienne_Boyer.mdx": {
	id: "Lucienne_Boyer.mdx";
  slug: "lucienne_boyer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lucy_Ozarin.mdx": {
	id: "Lucy_Ozarin.mdx";
  slug: "lucy_ozarin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ludovico_Carracci.mdx": {
	id: "Ludovico_Carracci.mdx";
  slug: "ludovico_carracci";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ludwig_Uhland.mdx": {
	id: "Ludwig_Uhland.mdx";
  slug: "ludwig_uhland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Luftwaffe.mdx": {
	id: "Luftwaffe.mdx";
  slug: "luftwaffe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Luna_24.mdx": {
	id: "Luna_24.mdx";
  slug: "luna_24";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Luo_Shiwen.mdx": {
	id: "Luo_Shiwen.mdx";
  slug: "luo_shiwen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Lydia_Litvyak.mdx": {
	id: "Lydia_Litvyak.mdx";
  slug: "lydia_litvyak";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"MV_Prestige.mdx": {
	id: "MV_Prestige.mdx";
  slug: "mv_prestige";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mabel_Fairbanks.mdx": {
	id: "Mabel_Fairbanks.mdx";
  slug: "mabel_fairbanks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Madelaine_Petsch.mdx": {
	id: "Madelaine_Petsch.mdx";
  slug: "madelaine_petsch";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Madeleine_Lemoyne_Ellicott.mdx": {
	id: "Madeleine_Lemoyne_Ellicott.mdx";
  slug: "madeleine_lemoyne_ellicott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Madeleine_Stowe.mdx": {
	id: "Madeleine_Stowe.mdx";
  slug: "madeleine_stowe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Madrid_Accords.mdx": {
	id: "Madrid_Accords.mdx";
  slug: "madrid_accords";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Magdalen_Nabb.mdx": {
	id: "Magdalen_Nabb.mdx";
  slug: "magdalen_nabb";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maggie_Roswell.mdx": {
	id: "Maggie_Roswell.mdx";
  slug: "maggie_roswell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mahboob_Ali_Khan.mdx": {
	id: "Mahboob_Ali_Khan.mdx";
  slug: "mahboob_ali_khan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maia_Mitchell.mdx": {
	id: "Maia_Mitchell.mdx";
  slug: "maia_mitchell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maksim_Podholjuzin.mdx": {
	id: "Maksim_Podholjuzin.mdx";
  slug: "maksim_podholjuzin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Malcolm_III_of_Scotland.mdx": {
	id: "Malcolm_III_of_Scotland.mdx";
  slug: "malcolm_iii_of_scotland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maleli_Kunavore.mdx": {
	id: "Maleli_Kunavore.mdx";
  slug: "maleli_kunavore";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Manny_Villar.mdx": {
	id: "Manny_Villar.mdx";
  slug: "manny_villar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Manon_Cleary.mdx": {
	id: "Manon_Cleary.mdx";
  slug: "manon_cleary";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Manuel_de_Falla.mdx": {
	id: "Manuel_de_Falla.mdx";
  slug: "manuel_de_falla";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maratha_Confederacy.mdx": {
	id: "Maratha_Confederacy.mdx";
  slug: "maratha_confederacy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marco_Leonardi.mdx": {
	id: "Marco_Leonardi.mdx";
  slug: "marco_leonardi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Margaret_Murie.mdx": {
	id: "Margaret_Murie.mdx";
  slug: "margaret_murie";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Margaret_Murray.mdx": {
	id: "Margaret_Murray.mdx";
  slug: "margaret_murray";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Margaret_Sarah_Carpenter.mdx": {
	id: "Margaret_Sarah_Carpenter.mdx";
  slug: "margaret_sarah_carpenter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Margaret_Wise_Brown.mdx": {
	id: "Margaret_Wise_Brown.mdx";
  slug: "margaret_wise_brown";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Margaret_of_Valois.mdx": {
	id: "Margaret_of_Valois.mdx";
  slug: "margaret_of_valois";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marge_Schott.mdx": {
	id: "Marge_Schott.mdx";
  slug: "marge_schott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maria_Anna_of_Spain.mdx": {
	id: "Maria_Anna_of_Spain.mdx";
  slug: "maria_anna_of_spain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maria_Cristina_of_Savoy.mdx": {
	id: "Maria_Cristina_of_Savoy.mdx";
  slug: "maria_cristina_of_savoy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maria_Ulfah_Santoso.mdx": {
	id: "Maria_Ulfah_Santoso.mdx";
  slug: "maria_ulfah_santoso";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mariner_9.mdx": {
	id: "Mariner_9.mdx";
  slug: "mariner_9";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mark_Kuhlmann.mdx": {
	id: "Mark_Kuhlmann.mdx";
  slug: "mark_kuhlmann";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mark_Lye.mdx": {
	id: "Mark_Lye.mdx";
  slug: "mark_lye";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mark_Phillips.mdx": {
	id: "Mark_Phillips.mdx";
  slug: "mark_phillips";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mark_Sargent.mdx": {
	id: "Mark_Sargent.mdx";
  slug: "mark_sargent";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mars.mdx": {
	id: "Mars.mdx";
  slug: "mars";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marshall_Field.mdx": {
	id: "Marshall_Field.mdx";
  slug: "marshall_field";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marshall_Thundering_Herd_football.mdx": {
	id: "Marshall_Thundering_Herd_football.mdx";
  slug: "marshall_thundering_herd_football";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marshall_University.mdx": {
	id: "Marshall_University.mdx";
  slug: "marshall_university";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Martha_Tilton.mdx": {
	id: "Martha_Tilton.mdx";
  slug: "martha_tilton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Martin_Fay.mdx": {
	id: "Martin_Fay.mdx";
  slug: "martin_fay";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Martin_Mull.mdx": {
	id: "Martin_Mull.mdx";
  slug: "martin_mull";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Martinique.mdx": {
	id: "Martinique.mdx";
  slug: "martinique";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Maruyama_Gondazaemon.mdx": {
	id: "Maruyama_Gondazaemon.mdx";
  slug: "maruyama_gondazaemon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Marvin_Isley.mdx": {
	id: "Marvin_Isley.mdx";
  slug: "marvin_isley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mary_Greyeyes.mdx": {
	id: "Mary_Greyeyes.mdx";
  slug: "mary_greyeyes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mary_Wigman.mdx": {
	id: "Mary_Wigman.mdx";
  slug: "mary_wigman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Masahiro_Hasemi.mdx": {
	id: "Masahiro_Hasemi.mdx";
  slug: "masahiro_hasemi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Masta_Killa.mdx": {
	id: "Masta_Killa.mdx";
  slug: "masta_killa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Matsuyama_Airport.mdx": {
	id: "Matsuyama_Airport.mdx";
  slug: "matsuyama_airport";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Matt_Bennett.mdx": {
	id: "Matt_Bennett.mdx";
  slug: "matt_bennett";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Matt_Bloom.mdx": {
	id: "Matt_Bloom.mdx";
  slug: "matt_bloom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Matti_Lonkainen.mdx": {
	id: "Matti_Lonkainen.mdx";
  slug: "matti_lonkainen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Max_Dehn.mdx": {
	id: "Max_Dehn.mdx";
  slug: "max_dehn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Max_Lanier.mdx": {
	id: "Max_Lanier.mdx";
  slug: "max_lanier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"McLean_Stevenson.mdx": {
	id: "McLean_Stevenson.mdx";
  slug: "mclean_stevenson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Medal_of_Honor.mdx": {
	id: "Medal_of_Honor.mdx";
  slug: "medal_of_honor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mel_Stottlemyre.mdx": {
	id: "Mel_Stottlemyre.mdx";
  slug: "mel_stottlemyre";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Meriwether_Lewis.mdx": {
	id: "Meriwether_Lewis.mdx";
  slug: "meriwether_lewis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Merrick_Garland.mdx": {
	id: "Merrick_Garland.mdx";
  slug: "merrick_garland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mersenne_prime.mdx": {
	id: "Mersenne_prime.mdx";
  slug: "mersenne_prime";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Miami.mdx": {
	id: "Miami.mdx";
  slug: "miami";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michael_Busselle.mdx": {
	id: "Michael_Busselle.mdx";
  slug: "michael_busselle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michael_Copon.mdx": {
	id: "Michael_Copon.mdx";
  slug: "michael_copon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michael_Deaver.mdx": {
	id: "Michael_Deaver.mdx";
  slug: "michael_deaver";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michael_Dobbs.mdx": {
	id: "Michael_Dobbs.mdx";
  slug: "michael_dobbs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michael_Robbins.mdx": {
	id: "Michael_Robbins.mdx";
  slug: "michael_robbins";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michala_Banas.mdx": {
	id: "Michala_Banas.mdx";
  slug: "michala_banas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Michel_Colombier.mdx": {
	id: "Michel_Colombier.mdx";
  slug: "michel_colombier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Miguel_I_of_Portugal.mdx": {
	id: "Miguel_I_of_Portugal.mdx";
  slug: "miguel_i_of_portugal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Miguel_Sabah.mdx": {
	id: "Miguel_Sabah.mdx";
  slug: "miguel_sabah";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mike_Katz.mdx": {
	id: "Mike_Katz.mdx";
  slug: "mike_katz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mike_LaValliere.mdx": {
	id: "Mike_LaValliere.mdx";
  slug: "mike_lavalliere";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mir_Mosharraf_Hossain.mdx": {
	id: "Mir_Mosharraf_Hossain.mdx";
  slug: "mir_mosharraf_hossain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Miriam_Brouwer.mdx": {
	id: "Miriam_Brouwer.mdx";
  slug: "miriam_brouwer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Moitheri_Ntobo.mdx": {
	id: "Moitheri_Ntobo.mdx";
  slug: "moitheri_ntobo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Monique_Coleman.mdx": {
	id: "Monique_Coleman.mdx";
  slug: "monique_coleman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Monique_Mercure.mdx": {
	id: "Monique_Mercure.mdx";
  slug: "monique_mercure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Montgomery_bus_boycott.mdx": {
	id: "Montgomery_bus_boycott.mdx";
  slug: "montgomery_bus_boycott";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Montreal.mdx": {
	id: "Montreal.mdx";
  slug: "montreal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Moon.mdx": {
	id: "Moon.mdx";
  slug: "moon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Moons_of_Mars.mdx": {
	id: "Moons_of_Mars.mdx";
  slug: "moons_of_mars";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Morgan_Sanson.mdx": {
	id: "Morgan_Sanson.mdx";
  slug: "morgan_sanson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Morteza_Pashaei.mdx": {
	id: "Morteza_Pashaei.mdx";
  slug: "morteza_pashaei";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mortise_lock.mdx": {
	id: "Mortise_lock.mdx";
  slug: "mortise_lock";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Moshe_Pesach.mdx": {
	id: "Moshe_Pesach.mdx";
  slug: "moshe_pesach";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Motoo_Kimura.mdx": {
	id: "Motoo_Kimura.mdx";
  slug: "motoo_kimura";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Moura_Lympany.mdx": {
	id: "Moura_Lympany.mdx";
  slug: "moura_lympany";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Mozambique.mdx": {
	id: "Mozambique.mdx";
  slug: "mozambique";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Murray_Oliver.mdx": {
	id: "Murray_Oliver.mdx";
  slug: "murray_oliver";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"NASA.mdx": {
	id: "NASA.mdx";
  slug: "nasa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"NME.mdx": {
	id: "NME.mdx";
  slug: "nme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nanase_Hoshii.mdx": {
	id: "Nanase_Hoshii.mdx";
  slug: "nanase_hoshii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Napoleonic_Wars.mdx": {
	id: "Napoleonic_Wars.mdx";
  slug: "napoleonic_wars";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Narapatisithu.mdx": {
	id: "Narapatisithu.mdx";
  slug: "narapatisithu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Narciso_Yepes.mdx": {
	id: "Narciso_Yepes.mdx";
  slug: "narciso_yepes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nat_Young.mdx": {
	id: "Nat_Young.mdx";
  slug: "nat_young";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Natalia_Gutman.mdx": {
	id: "Natalia_Gutman.mdx";
  slug: "natalia_gutman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nathan_Clifford.mdx": {
	id: "Nathan_Clifford.mdx";
  slug: "nathan_clifford";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nathaniel_Claiborne.mdx": {
	id: "Nathaniel_Claiborne.mdx";
  slug: "nathaniel_claiborne";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Naval_Battle_of_Guadalcanal.mdx": {
	id: "Naval_Battle_of_Guadalcanal.mdx";
  slug: "naval_battle_of_guadalcanal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Neagu_Djuvara.mdx": {
	id: "Neagu_Djuvara.mdx";
  slug: "neagu_djuvara";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Neil_Flynn.mdx": {
	id: "Neil_Flynn.mdx";
  slug: "neil_flynn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Neil_Heywood.mdx": {
	id: "Neil_Heywood.mdx";
  slug: "neil_heywood";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nell_Gwyn.mdx": {
	id: "Nell_Gwyn.mdx";
  slug: "nell_gwyn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nellie_Bly.mdx": {
	id: "Nellie_Bly.mdx";
  slug: "nellie_bly";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nettie_Palmer.mdx": {
	id: "Nettie_Palmer.mdx";
  slug: "nettie_palmer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nevado_del_Ruiz.mdx": {
	id: "Nevado_del_Ruiz.mdx";
  slug: "nevado_del_ruiz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"New_Jersey.mdx": {
	id: "New_Jersey.mdx";
  slug: "new_jersey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"New_Zealand.mdx": {
	id: "New_Zealand.mdx";
  slug: "new_zealand";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nha_Trang.mdx": {
	id: "Nha_Trang.mdx";
  slug: "nha_trang";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nick_Fuentes.mdx": {
	id: "Nick_Fuentes.mdx";
  slug: "nick_fuentes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nico_Motchebon.mdx": {
	id: "Nico_Motchebon.mdx";
  slug: "nico_motchebon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nicole_Krauss.mdx": {
	id: "Nicole_Krauss.mdx";
  slug: "nicole_krauss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nigel_Griggs.mdx": {
	id: "Nigel_Griggs.mdx";
  slug: "nigel_griggs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nigeria_Airways_Flight_357.mdx": {
	id: "Nigeria_Airways_Flight_357.mdx";
  slug: "nigeria_airways_flight_357";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nikitas_Platis.mdx": {
	id: "Nikitas_Platis.mdx";
  slug: "nikitas_platis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nikolai_Fraiture.mdx": {
	id: "Nikolai_Fraiture.mdx";
  slug: "nikolai_fraiture";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nikolaus_Pevsner.mdx": {
	id: "Nikolaus_Pevsner.mdx";
  slug: "nikolaus_pevsner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nile.mdx": {
	id: "Nile.mdx";
  slug: "nile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nina_Gordon.mdx": {
	id: "Nina_Gordon.mdx";
  slug: "nina_gordon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nineteenth_Amendment_to_the_United_States_Constitution.mdx": {
	id: "Nineteenth_Amendment_to_the_United_States_Constitution.mdx";
  slug: "nineteenth_amendment_to_the_united_states_constitution";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nobel_Peace_Prize.mdx": {
	id: "Nobel_Peace_Prize.mdx";
  slug: "nobel_peace_prize";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Nobel_Prize_in_Physiology_or_Medicine.mdx": {
	id: "Nobel_Prize_in_Physiology_or_Medicine.mdx";
  slug: "nobel_prize_in_physiology_or_medicine";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Norman_Brookes.mdx": {
	id: "Norman_Brookes.mdx";
  slug: "norman_brookes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Norodom_Sihanouk.mdx": {
	id: "Norodom_Sihanouk.mdx";
  slug: "norodom_sihanouk";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"North_Vietnam.mdx": {
	id: "North_Vietnam.mdx";
  slug: "north_vietnam";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Northern_Alliance.mdx": {
	id: "Northern_Alliance.mdx";
  slug: "northern_alliance";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"November_14.mdx": {
	id: "November_14.mdx";
  slug: "november_14";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"November_2015_Paris_attacks.mdx": {
	id: "November_2015_Paris_attacks.mdx";
  slug: "november_2015_paris_attacks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Obie_Trice.mdx": {
	id: "Obie_Trice.mdx";
  slug: "obie_trice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Oil_tanker.mdx": {
	id: "Oil_tanker.mdx";
  slug: "oil_tanker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Olaf_I_of_Denmark.mdx": {
	id: "Olaf_I_of_Denmark.mdx";
  slug: "olaf_i_of_denmark";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Olga_Bergholz.mdx": {
	id: "Olga_Bergholz.mdx";
  slug: "olga_bergholz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Olga_Kurylenko.mdx": {
	id: "Olga_Kurylenko.mdx";
  slug: "olga_kurylenko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Oliver_Stummvoll.mdx": {
	id: "Oliver_Stummvoll.mdx";
  slug: "oliver_stummvoll";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ontario.mdx": {
	id: "Ontario.mdx";
  slug: "ontario";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Operation_Starlite.mdx": {
	id: "Operation_Starlite.mdx";
  slug: "operation_starlite";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Opposition_to_United_States_involvement_in_the_Vietnam_War.mdx": {
	id: "Opposition_to_United_States_involvement_in_the_Vietnam_War.mdx";
  slug: "opposition_to_united_states_involvement_in_the_vietnam_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Orca.mdx": {
	id: "Orca.mdx";
  slug: "orca";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Oskar_Werner.mdx": {
	id: "Oskar_Werner.mdx";
  slug: "oskar_werner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ostasio_I_da_Polenta.mdx": {
	id: "Ostasio_I_da_Polenta.mdx";
  slug: "ostasio_i_da_polenta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Otto_Ernst_Remer.mdx": {
	id: "Otto_Ernst_Remer.mdx";
  slug: "otto_ernst_remer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ottoman_Empire.mdx": {
	id: "Ottoman_Empire.mdx";
  slug: "ottoman_empire";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pallig.mdx": {
	id: "Pallig.mdx";
  slug: "pallig";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pan_Am_Flight_103.mdx": {
	id: "Pan_Am_Flight_103.mdx";
  slug: "pan_am_flight_103";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paraskevas_Antzas.mdx": {
	id: "Paraskevas_Antzas.mdx";
  slug: "paraskevas_antzas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paris.mdx": {
	id: "Paris.mdx";
  slug: "paris";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Park_Chung_Hee.mdx": {
	id: "Park_Chung_Hee.mdx";
  slug: "park_chung_hee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Parker_McKenna_Posey.mdx": {
	id: "Parker_McKenna_Posey.mdx";
  slug: "parker_mckenna_posey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pat_Hentgen.mdx": {
	id: "Pat_Hentgen.mdx";
  slug: "pat_hentgen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pat_Reid.mdx": {
	id: "Pat_Reid.mdx";
  slug: "pat_reid";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Patrick_Swayze.mdx": {
	id: "Patrick_Swayze.mdx";
  slug: "patrick_swayze";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Patrick_Warburton.mdx": {
	id: "Patrick_Warburton.mdx";
  slug: "patrick_warburton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Patrik_Andersson.mdx": {
	id: "Patrik_Andersson.mdx";
  slug: "patrik_andersson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Patrik_Augusta.mdx": {
	id: "Patrik_Augusta.mdx";
  slug: "patrik_augusta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paul_Attanasio.mdx": {
	id: "Paul_Attanasio.mdx";
  slug: "paul_attanasio";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paul_Dacre.mdx": {
	id: "Paul_Dacre.mdx";
  slug: "paul_dacre";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paul_Ludwig_Ewald_von_Kleist.mdx": {
	id: "Paul_Ludwig_Ewald_von_Kleist.mdx";
  slug: "paul_ludwig_ewald_von_kleist";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paul_Mares.mdx": {
	id: "Paul_Mares.mdx";
  slug: "paul_mares";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paul_McGann.mdx": {
	id: "Paul_McGann.mdx";
  slug: "paul_mcgann";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Paula_Danziger.mdx": {
	id: "Paula_Danziger.mdx";
  slug: "paula_danziger";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pendle_witches.mdx": {
	id: "Pendle_witches.mdx";
  slug: "pendle_witches";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Persis_Khambatta.mdx": {
	id: "Persis_Khambatta.mdx";
  slug: "persis_khambatta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pervez_Musharraf.mdx": {
	id: "Pervez_Musharraf.mdx";
  slug: "pervez_musharraf";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peshwa.mdx": {
	id: "Peshwa.mdx";
  slug: "peshwa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peter_Arnett.mdx": {
	id: "Peter_Arnett.mdx";
  slug: "peter_arnett";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peter_Katin.mdx": {
	id: "Peter_Katin.mdx";
  slug: "peter_katin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peter_Norton.mdx": {
	id: "Peter_Norton.mdx";
  slug: "peter_norton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peter_Sutcliffe.mdx": {
	id: "Peter_Sutcliffe.mdx";
  slug: "peter_sutcliffe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Peter_Wittgenstein.mdx": {
	id: "Peter_Wittgenstein.mdx";
  slug: "peter_wittgenstein";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Petra_Rossner.mdx": {
	id: "Petra_Rossner.mdx";
  slug: "petra_rossner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pharaoh.mdx": {
	id: "Pharaoh.mdx";
  slug: "pharaoh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Phil_Donahue.mdx": {
	id: "Phil_Donahue.mdx";
  slug: "phil_donahue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Philip_Egan.mdx": {
	id: "Philip_Egan.mdx";
  slug: "philip_egan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Philip_the_Apostle.mdx": {
	id: "Philip_the_Apostle.mdx";
  slug: "philip_the_apostle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Philippines.mdx": {
	id: "Philippines.mdx";
  slug: "philippines";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Phnom_Penh.mdx": {
	id: "Phnom_Penh.mdx";
  slug: "phnom_penh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pierre_Grondin.mdx": {
	id: "Pierre_Grondin.mdx";
  slug: "pierre_grondin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pierre_Janssen.mdx": {
	id: "Pierre_Janssen.mdx";
  slug: "pierre_janssen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pini_Gershon.mdx": {
	id: "Pini_Gershon.mdx";
  slug: "pini_gershon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Policarpa_Salavarrieta.mdx": {
	id: "Policarpa_Salavarrieta.mdx";
  slug: "policarpa_salavarrieta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pope_Adrian_V.mdx": {
	id: "Pope_Adrian_V.mdx";
  slug: "pope_adrian_v";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pope_Alexander_VI.mdx": {
	id: "Pope_Alexander_VI.mdx";
  slug: "pope_alexander_vi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pope_Nicholas_I.mdx": {
	id: "Pope_Nicholas_I.mdx";
  slug: "pope_nicholas_i";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pope_Paul_IV.mdx": {
	id: "Pope_Paul_IV.mdx";
  slug: "pope_paul_iv";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pope_Sixtus_III.mdx": {
	id: "Pope_Sixtus_III.mdx";
  slug: "pope_sixtus_iii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pranab_Mukherjee.mdx": {
	id: "Pranab_Mukherjee.mdx";
  slug: "pranab_mukherjee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Premier_of_South_Australia.mdx": {
	id: "Premier_of_South_Australia.mdx";
  slug: "premier_of_south_australia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Premier_of_Tasmania.mdx": {
	id: "Premier_of_Tasmania.mdx";
  slug: "premier_of_tasmania";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"President_of_Mexico.mdx": {
	id: "President_of_Mexico.mdx";
  slug: "president_of_mexico";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"President_of_Namibia.mdx": {
	id: "President_of_Namibia.mdx";
  slug: "president_of_namibia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"President_of_Pakistan.mdx": {
	id: "President_of_Pakistan.mdx";
  slug: "president_of_pakistan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"President_of_South_Korea.mdx": {
	id: "President_of_South_Korea.mdx";
  slug: "president_of_south_korea";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"President_of_Venezuela.mdx": {
	id: "President_of_Venezuela.mdx";
  slug: "president_of_venezuela";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prestige_oil_spill.mdx": {
	id: "Prestige_oil_spill.mdx";
  slug: "prestige_oil_spill";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_Australia.mdx": {
	id: "Prime_Minister_of_Australia.mdx";
  slug: "prime_minister_of_australia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_Cambodia.mdx": {
	id: "Prime_Minister_of_Cambodia.mdx";
  slug: "prime_minister_of_cambodia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_Estonia.mdx": {
	id: "Prime_Minister_of_Estonia.mdx";
  slug: "prime_minister_of_estonia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_France.mdx": {
	id: "Prime_Minister_of_France.mdx";
  slug: "prime_minister_of_france";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_India.mdx": {
	id: "Prime_Minister_of_India.mdx";
  slug: "prime_minister_of_india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prime_Minister_of_the_United_Kingdom.mdx": {
	id: "Prime_Minister_of_the_United_Kingdom.mdx";
  slug: "prime_minister_of_the_united_kingdom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Prince_Henry_the_Navigator.mdx": {
	id: "Prince_Henry_the_Navigator.mdx";
  slug: "prince_henry_the_navigator";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Princess_Viktoria_of_Prussia.mdx": {
	id: "Princess_Viktoria_of_Prussia.mdx";
  slug: "princess_viktoria_of_prussia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Protestantism.mdx": {
	id: "Protestantism.mdx";
  slug: "protestantism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Public_holidays_in_Indonesia.mdx": {
	id: "Public_holidays_in_Indonesia.mdx";
  slug: "public_holidays_in_indonesia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Puget_Sound.mdx": {
	id: "Puget_Sound.mdx";
  slug: "puget_sound";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Pushkar_Lele.mdx": {
	id: "Pushkar_Lele.mdx";
  slug: "pushkar_lele";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Quintian_of_Rodez.mdx": {
	id: "Quintian_of_Rodez.mdx";
  slug: "quintian_of_rodez";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rafael_Pineda_Ponce.mdx": {
	id: "Rafael_Pineda_Ponce.mdx";
  slug: "rafael_pineda_ponce";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rafer_Johnson.mdx": {
	id: "Rafer_Johnson.mdx";
  slug: "rafer_johnson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rainer_Woelki.mdx": {
	id: "Rainer_Woelki.mdx";
  slug: "rainer_woelki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rancho_Tehama_shootings.mdx": {
	id: "Rancho_Tehama_shootings.mdx";
  slug: "rancho_tehama_shootings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ranjit_Singh.mdx": {
	id: "Ranjit_Singh.mdx";
  slug: "ranjit_singh";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ray_Mancini.mdx": {
	id: "Ray_Mancini.mdx";
  slug: "ray_mancini";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ray_Wylie_Hubbard.mdx": {
	id: "Ray_Wylie_Hubbard.mdx";
  slug: "ray_wylie_hubbard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Recluse.mdx": {
	id: "Recluse.mdx";
  slug: "recluse";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Red_Holzman.mdx": {
	id: "Red_Holzman.mdx";
  slug: "red_holzman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Renato_Sanches.mdx": {
	id: "Renato_Sanches.mdx";
  slug: "renato_sanches";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Republic_of_Karelia.mdx": {
	id: "Republic_of_Karelia.mdx";
  slug: "republic_of_karelia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Republics_of_Russia.mdx": {
	id: "Republics_of_Russia.mdx";
  slug: "republics_of_russia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rex_Linn.mdx": {
	id: "Rex_Linn.mdx";
  slug: "rex_linn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rexist_Party.mdx": {
	id: "Rexist_Party.mdx";
  slug: "rexist_party";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ricardo_Villa.mdx": {
	id: "Ricardo_Villa.mdx";
  slug: "ricardo_villa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Richard_Harmon.mdx": {
	id: "Richard_Harmon.mdx";
  slug: "richard_harmon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Richard_Montgomery.mdx": {
	id: "Richard_Montgomery.mdx";
  slug: "richard_montgomery";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Richard_Mulligan.mdx": {
	id: "Richard_Mulligan.mdx";
  slug: "richard_mulligan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Richard_Topcliffe.mdx": {
	id: "Richard_Topcliffe.mdx";
  slug: "richard_topcliffe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ricimer.mdx": {
	id: "Ricimer.mdx";
  slug: "ricimer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roanoke_Colony.mdx": {
	id: "Roanoke_Colony.mdx";
  slug: "roanoke_colony";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roanoke_Island.mdx": {
	id: "Roanoke_Island.mdx";
  slug: "roanoke_island";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rob_Nguyen.mdx": {
	id: "Rob_Nguyen.mdx";
  slug: "rob_nguyen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Aaron.mdx": {
	id: "Robert_Aaron.mdx";
  slug: "robert_aaron";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Bonnaud.mdx": {
	id: "Robert_Bonnaud.mdx";
  slug: "robert_bonnaud";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Fulton.mdx": {
	id: "Robert_Fulton.mdx";
  slug: "robert_fulton";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Ginty.mdx": {
	id: "Robert_Ginty.mdx";
  slug: "robert_ginty";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Hitchcock.mdx": {
	id: "Robert_Hitchcock.mdx";
  slug: "robert_hitchcock";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Huth.mdx": {
	id: "Robert_Huth.mdx";
  slug: "robert_huth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Louis_Stevenson.mdx": {
	id: "Robert_Louis_Stevenson.mdx";
  slug: "robert_louis_stevenson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Novak.mdx": {
	id: "Robert_Novak.mdx";
  slug: "robert_novak";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Redford.mdx": {
	id: "Robert_Redford.mdx";
  slug: "robert_redford";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Sterling.mdx": {
	id: "Robert_Sterling.mdx";
  slug: "robert_sterling";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Trout.mdx": {
	id: "Robert_Trout.mdx";
  slug: "robert_trout";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Robert_Winters.mdx": {
	id: "Robert_Winters.mdx";
  slug: "robert_winters";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roberto_Boninsegna.mdx": {
	id: "Roberto_Boninsegna.mdx";
  slug: "roberto_boninsegna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roberto_Clemente.mdx": {
	id: "Roberto_Clemente.mdx";
  slug: "roberto_clemente";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roger_Smalley.mdx": {
	id: "Roger_Smalley.mdx";
  slug: "roger_smalley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rohana_Wijeweera.mdx": {
	id: "Rohana_Wijeweera.mdx";
  slug: "rohana_wijeweera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Romain_Maes.mdx": {
	id: "Romain_Maes.mdx";
  slug: "romain_maes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roman_Polanski.mdx": {
	id: "Roman_Polanski.mdx";
  slug: "roman_polanski";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Romania.mdx": {
	id: "Romania.mdx";
  slug: "romania";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ron_Strykert.mdx": {
	id: "Ron_Strykert.mdx";
  slug: "ron_strykert";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rosalynn_Carter.mdx": {
	id: "Rosalynn_Carter.mdx";
  slug: "rosalynn_carter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rose_Friedman.mdx": {
	id: "Rose_Friedman.mdx";
  slug: "rose_friedman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rosemary_DeCamp.mdx": {
	id: "Rosemary_DeCamp.mdx";
  slug: "rosemary_decamp";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ross_McCormack.mdx": {
	id: "Ross_McCormack.mdx";
  slug: "ross_mccormack";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Roundhead.mdx": {
	id: "Roundhead.mdx";
  slug: "roundhead";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Royal_Alexandra_Theatre.mdx": {
	id: "Royal_Alexandra_Theatre.mdx";
  slug: "royal_alexandra_theatre";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ruby_Bridges.mdx": {
	id: "Ruby_Bridges.mdx";
  slug: "ruby_bridges";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ruby_laser.mdx": {
	id: "Ruby_laser.mdx";
  slug: "ruby_laser";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Rugby_League_World_Cup.mdx": {
	id: "Rugby_League_World_Cup.mdx";
  slug: "rugby_league_world_cup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Russell_Tovey.mdx": {
	id: "Russell_Tovey.mdx";
  slug: "russell_tovey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ruth_Bonner.mdx": {
	id: "Ruth_Bonner.mdx";
  slug: "ruth_bonner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ruth_Johnson_Colvin.mdx": {
	id: "Ruth_Johnson_Colvin.mdx";
  slug: "ruth_johnson_colvin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ruth_Norman.mdx": {
	id: "Ruth_Norman.mdx";
  slug: "ruth_norman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ryan_Bertin.mdx": {
	id: "Ryan_Bertin.mdx";
  slug: "ryan_bertin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Ryo_Hayami.mdx": {
	id: "Ryo_Hayami.mdx";
  slug: "ryo_hayami";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"SS_Yarmouth_Castle.mdx": {
	id: "SS_Yarmouth_Castle.mdx";
  slug: "ss_yarmouth_castle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sack_of_Shamakhi.mdx": {
	id: "Sack_of_Shamakhi.mdx";
  slug: "sack_of_shamakhi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sadie_Hawkins_Day.mdx": {
	id: "Sadie_Hawkins_Day.mdx";
  slug: "sadie_hawkins_day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Safavid_Shirvan.mdx": {
	id: "Safavid_Shirvan.mdx";
  slug: "safavid_shirvan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saint_Fiacre.mdx": {
	id: "Saint_Fiacre.mdx";
  slug: "saint_fiacre";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saint_Homobonus.mdx": {
	id: "Saint_Homobonus.mdx";
  slug: "saint_homobonus";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saint_Inan.mdx": {
	id: "Saint_Inan.mdx";
  slug: "saint_inan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saint_Venera.mdx": {
	id: "Saint_Venera.mdx";
  slug: "saint_venera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saki.mdx": {
	id: "Saki.mdx";
  slug: "saki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Salim_Kallas.mdx": {
	id: "Salim_Kallas.mdx";
  slug: "salim_kallas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Samantha_Riley.mdx": {
	id: "Samantha_Riley.mdx";
  slug: "samantha_riley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Samkon_Gado.mdx": {
	id: "Samkon_Gado.mdx";
  slug: "samkon_gado";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Samuel_Umtiti.mdx": {
	id: "Samuel_Umtiti.mdx";
  slug: "samuel_umtiti";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sandeep_Patil.mdx": {
	id: "Sandeep_Patil.mdx";
  slug: "sandeep_patil";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sandy_Pearce.mdx": {
	id: "Sandy_Pearce.mdx";
  slug: "sandy_pearce";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sara_Del_Rey.mdx": {
	id: "Sara_Del_Rey.mdx";
  slug: "sara_del_rey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sarah_Dash.mdx": {
	id: "Sarah_Dash.mdx";
  slug: "sarah_dash";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Saul_Kripke.mdx": {
	id: "Saul_Kripke.mdx";
  slug: "saul_kripke";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Scott_McKenzie.mdx": {
	id: "Scott_McKenzie.mdx";
  slug: "scott_mckenzie";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Scott_McNealy.mdx": {
	id: "Scott_McNealy.mdx";
  slug: "scott_mcnealy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Seagram.mdx": {
	id: "Seagram.mdx";
  slug: "seagram";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Seattle.mdx": {
	id: "Seattle.mdx";
  slug: "seattle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sebastiano_Montelupi.mdx": {
	id: "Sebastiano_Montelupi.mdx";
  slug: "sebastiano_montelupi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Secretary_of_State_for_Canada.mdx": {
	id: "Secretary_of_State_for_Canada.mdx";
  slug: "secretary_of_state_for_canada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Secretary_of_the_Interior_and_Local_Government.mdx": {
	id: "Secretary_of_the_Interior_and_Local_Government.mdx";
  slug: "secretary_of_the_interior_and_local_government";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Seiya_Suzuki.mdx": {
	id: "Seiya_Suzuki.mdx";
  slug: "seiya_suzuki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Senate_of_Finland.mdx": {
	id: "Senate_of_Finland.mdx";
  slug: "senate_of_finland";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Serapion_of_Algiers.mdx": {
	id: "Serapion_of_Algiers.mdx";
  slug: "serapion_of_algiers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Seto_Inland_Sea.mdx": {
	id: "Seto_Inland_Sea.mdx";
  slug: "seto_inland_sea";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shabazz_Muhammad.mdx": {
	id: "Shabazz_Muhammad.mdx";
  slug: "shabazz_muhammad";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shamakhi.mdx": {
	id: "Shamakhi.mdx";
  slug: "shamakhi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sheila_Cassidy.mdx": {
	id: "Sheila_Cassidy.mdx";
  slug: "sheila_cassidy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shelley_Winters.mdx": {
	id: "Shelley_Winters.mdx";
  slug: "shelley_winters";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sherwood_Schwartz.mdx": {
	id: "Sherwood_Schwartz.mdx";
  slug: "sherwood_schwartz";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shirley_Crabtree.mdx": {
	id: "Shirley_Crabtree.mdx";
  slug: "shirley_crabtree";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shoshone_National_Forest.mdx": {
	id: "Shoshone_National_Forest.mdx";
  slug: "shoshone_national_forest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Shumshu.mdx": {
	id: "Shumshu.mdx";
  slug: "shumshu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sigourney_Bandjar.mdx": {
	id: "Sigourney_Bandjar.mdx";
  slug: "sigourney_bandjar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Silla.mdx": {
	id: "Silla.mdx";
  slug: "silla";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Smokejumper.mdx": {
	id: "Smokejumper.mdx";
  slug: "smokejumper";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sofia_Kenin.mdx": {
	id: "Sofia_Kenin.mdx";
  slug: "sofia_kenin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sofie_Merckx.mdx": {
	id: "Sofie_Merckx.mdx";
  slug: "sofie_merckx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sol_Kaplan.mdx": {
	id: "Sol_Kaplan.mdx";
  slug: "sol_kaplan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Solar_eclipse.mdx": {
	id: "Solar_eclipse.mdx";
  slug: "solar_eclipse";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Solicitor_General_of_Canada.mdx": {
	id: "Solicitor_General_of_Canada.mdx";
  slug: "solicitor_general_of_canada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sonny_Til.mdx": {
	id: "Sonny_Til.mdx";
  slug: "sonny_til";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sophia_Dorothea_of_Celle.mdx": {
	id: "Sophia_Dorothea_of_Celle.mdx";
  slug: "sophia_dorothea_of_celle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Southern_Airways_Flight_932.mdx": {
	id: "Southern_Airways_Flight_932.mdx";
  slug: "southern_airways_flight_932";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Soviet_Union.mdx": {
	id: "Soviet_Union.mdx";
  slug: "soviet_union";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Space_exploration.mdx": {
	id: "Space_exploration.mdx";
  slug: "space_exploration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Spanish_language.mdx": {
	id: "Spanish_language.mdx";
  slug: "spanish_language";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Stanislaus_Kostka.mdx": {
	id: "Stanislaus_Kostka.mdx";
  slug: "stanislaus_kostka";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Steamboat.mdx": {
	id: "Steamboat.mdx";
  slug: "steamboat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Stella_Maeve.mdx": {
	id: "Stella_Maeve.mdx";
  slug: "stella_maeve";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Stephen_Guarino.mdx": {
	id: "Stephen_Guarino.mdx";
  slug: "stephen_guarino";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Steve_Biko.mdx": {
	id: "Steve_Biko.mdx";
  slug: "steve_biko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Steve_Zahn.mdx": {
	id: "Steve_Zahn.mdx";
  slug: "steve_zahn";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Stirling_Colgate.mdx": {
	id: "Stirling_Colgate.mdx";
  slug: "stirling_colgate";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Stuart_Dew.mdx": {
	id: "Stuart_Dew.mdx";
  slug: "stuart_dew";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Subhas_Chandra_Bose.mdx": {
	id: "Subhas_Chandra_Bose.mdx";
  slug: "subhas_chandra_bose";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sudhir_Bhat.mdx": {
	id: "Sudhir_Bhat.mdx";
  slug: "sudhir_bhat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Suffrage.mdx": {
	id: "Suffrage.mdx";
  slug: "suffrage";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sukarno.mdx": {
	id: "Sukarno.mdx";
  slug: "sukarno";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sumner_Shapiro.mdx": {
	id: "Sumner_Shapiro.mdx";
  slug: "sumner_shapiro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Sun_Microsystems.mdx": {
	id: "Sun_Microsystems.mdx";
  slug: "sun_microsystems";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Supershear_earthquake.mdx": {
	id: "Supershear_earthquake.mdx";
  slug: "supershear_earthquake";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Supreme_Court_of_the_United_States.mdx": {
	id: "Supreme_Court_of_the_United_States.mdx";
  slug: "supreme_court_of_the_united_states";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Surface_rupture.mdx": {
	id: "Surface_rupture.mdx";
  slug: "surface_rupture";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Susanna_Haapoja.mdx": {
	id: "Susanna_Haapoja.mdx";
  slug: "susanna_haapoja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Suvra_Mukherjee.mdx": {
	id: "Suvra_Mukherjee.mdx";
  slug: "suvra_mukherjee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Taher_Elgamal.mdx": {
	id: "Taher_Elgamal.mdx";
  slug: "taher_elgamal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Takeoff.mdx": {
	id: "Takeoff.mdx";
  slug: "takeoff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Takuya_Kimura.mdx": {
	id: "Takuya_Kimura.mdx";
  slug: "takuya_kimura";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tam_Dalyell.mdx": {
	id: "Tam_Dalyell.mdx";
  slug: "tam_dalyell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tan_Dun.mdx": {
	id: "Tan_Dun.mdx";
  slug: "tan_dun";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Taylor_Hall.mdx": {
	id: "Taylor_Hall.mdx";
  slug: "taylor_hall";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Teodora_Ungureanu.mdx": {
	id: "Teodora_Ungureanu.mdx";
  slug: "teodora_ungureanu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Terry_Reid.mdx": {
	id: "Terry_Reid.mdx";
  slug: "terry_reid";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Texas.mdx": {
	id: "Texas.mdx";
  slug: "texas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"The_Hardest_Day.mdx": {
	id: "The_Hardest_Day.mdx";
  slug: "the_hardest_day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Theodore_II_Laskaris.mdx": {
	id: "Theodore_II_Laskaris.mdx";
  slug: "theodore_ii_laskaris";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Theodore_Maiman.mdx": {
	id: "Theodore_Maiman.mdx";
  slug: "theodore_maiman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Thessaloniki.mdx": {
	id: "Thessaloniki.mdx";
  slug: "thessaloniki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Thinzar_Shunlei_Yi.mdx": {
	id: "Thinzar_Shunlei_Yi.mdx";
  slug: "thinzar_shunlei_yi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Thomas_May.mdx": {
	id: "Thomas_May.mdx";
  slug: "thomas_may";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Thomas_Vermaelen.mdx": {
	id: "Thomas_Vermaelen.mdx";
  slug: "thomas_vermaelen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Thousand_Islands_Bridge.mdx": {
	id: "Thousand_Islands_Bridge.mdx";
  slug: "thousand_islands_bridge";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tim_Bowler.mdx": {
	id: "Tim_Bowler.mdx";
  slug: "tim_bowler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Timbuktu.mdx": {
	id: "Timbuktu.mdx";
  slug: "timbuktu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Timmy_Thomas.mdx": {
	id: "Timmy_Thomas.mdx";
  slug: "timmy_thomas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Timothy_Geithner.mdx": {
	id: "Timothy_Geithner.mdx";
  slug: "timothy_geithner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Toivo_Suursoo.mdx": {
	id: "Toivo_Suursoo.mdx";
  slug: "toivo_suursoo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tom_Compernolle.mdx": {
	id: "Tom_Compernolle.mdx";
  slug: "tom_compernolle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tom_Ferrier.mdx": {
	id: "Tom_Ferrier.mdx";
  slug: "tom_ferrier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tom_Prichard.mdx": {
	id: "Tom_Prichard.mdx";
  slug: "tom_prichard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tom_Villard.mdx": {
	id: "Tom_Villard.mdx";
  slug: "tom_villard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tony_Richardson.mdx": {
	id: "Tony_Richardson.mdx";
  slug: "tony_richardson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tosa_Mitsuoki.mdx": {
	id: "Tosa_Mitsuoki.mdx";
  slug: "tosa_mitsuoki";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Toy_Caldwell.mdx": {
	id: "Toy_Caldwell.mdx";
  slug: "toy_caldwell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tracy_Scoggins.mdx": {
	id: "Tracy_Scoggins.mdx";
  slug: "tracy_scoggins";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Travis_Barker.mdx": {
	id: "Travis_Barker.mdx";
  slug: "travis_barker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Tropical_cyclone.mdx": {
	id: "Tropical_cyclone.mdx";
  slug: "tropical_cyclone";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Umberto_Guidoni.mdx": {
	id: "Umberto_Guidoni.mdx";
  slug: "umberto_guidoni";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_Kingdom.mdx": {
	id: "United_Kingdom.mdx";
  slug: "united_kingdom";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States.mdx": {
	id: "United_States.mdx";
  slug: "united_states";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Attorney_General.mdx": {
	id: "United_States_Attorney_General.mdx";
  slug: "united_states_attorney_general";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Exploring_Expedition.mdx": {
	id: "United_States_Exploring_Expedition.mdx";
  slug: "united_states_exploring_expedition";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Forest_Service.mdx": {
	id: "United_States_Forest_Service.mdx";
  slug: "united_states_forest_service";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Marine_Corps.mdx": {
	id: "United_States_Marine_Corps.mdx";
  slug: "united_states_marine_corps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Navy.mdx": {
	id: "United_States_Navy.mdx";
  slug: "united_states_navy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Secretary_of_Defense.mdx": {
	id: "United_States_Secretary_of_Defense.mdx";
  slug: "united_states_secretary_of_defense";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Secretary_of_State.mdx": {
	id: "United_States_Secretary_of_State.mdx";
  slug: "united_states_secretary_of_state";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"United_States_Secretary_of_the_Treasury.mdx": {
	id: "United_States_Secretary_of_the_Treasury.mdx";
  slug: "united_states_secretary_of_the_treasury";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"University_of_Mississippi.mdx": {
	id: "University_of_Mississippi.mdx";
  slug: "university_of_mississippi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Urbain_Grandier.mdx": {
	id: "Urbain_Grandier.mdx";
  slug: "urbain_grandier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Uzbin_Valley_ambush.mdx": {
	id: "Uzbin_Valley_ambush.mdx";
  slug: "uzbin_valley_ambush";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Valerie_Hobson.mdx": {
	id: "Valerie_Hobson.mdx";
  slug: "valerie_hobson";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Valerie_Jarrett.mdx": {
	id: "Valerie_Jarrett.mdx";
  slug: "valerie_jarrett";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vancouver.mdx": {
	id: "Vancouver.mdx";
  slug: "vancouver";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vanessa_Bayer.mdx": {
	id: "Vanessa_Bayer.mdx";
  slug: "vanessa_bayer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vasantdada_Patil.mdx": {
	id: "Vasantdada_Patil.mdx";
  slug: "vasantdada_patil";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vasantrao_Naik.mdx": {
	id: "Vasantrao_Naik.mdx";
  slug: "vasantrao_naik";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vengayil_Kunhiraman_Nayanar.mdx": {
	id: "Vengayil_Kunhiraman_Nayanar.mdx";
  slug: "vengayil_kunhiraman_nayanar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Veronica_Lake.mdx": {
	id: "Veronica_Lake.mdx";
  slug: "veronica_lake";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Victor_Davis.mdx": {
	id: "Victor_Davis.mdx";
  slug: "victor_davis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Viet_Cong.mdx": {
	id: "Viet_Cong.mdx";
  slug: "viet_cong";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vietnam.mdx": {
	id: "Vietnam.mdx";
  slug: "vietnam";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vietnam_Airlines_Flight_474.mdx": {
	id: "Vietnam_Airlines_Flight_474.mdx";
  slug: "vietnam_airlines_flight_474";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vietnam_Veterans_Memorial.mdx": {
	id: "Vietnam_Veterans_Memorial.mdx";
  slug: "vietnam_veterans_memorial";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vietnam_War.mdx": {
	id: "Vietnam_War.mdx";
  slug: "vietnam_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vietnam_veteran.mdx": {
	id: "Vietnam_veteran.mdx";
  slug: "vietnam_veteran";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vikas_Khanna.mdx": {
	id: "Vikas_Khanna.mdx";
  slug: "vikas_khanna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vikram_Gokhale.mdx": {
	id: "Vikram_Gokhale.mdx";
  slug: "vikram_gokhale";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vincent_Apap.mdx": {
	id: "Vincent_Apap.mdx";
  slug: "vincent_apap";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vincent_Bugliosi.mdx": {
	id: "Vincent_Bugliosi.mdx";
  slug: "vincent_bugliosi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vinny_Testaverde.mdx": {
	id: "Vinny_Testaverde.mdx";
  slug: "vinny_testaverde";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Virginia.mdx": {
	id: "Virginia.mdx";
  slug: "virginia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Virginia_Dare.mdx": {
	id: "Virginia_Dare.mdx";
  slug: "virginia_dare";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vittorio_De_Sica.mdx": {
	id: "Vittorio_De_Sica.mdx";
  slug: "vittorio_de_sica";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Vladimir_Nabokov.mdx": {
	id: "Vladimir_Nabokov.mdx";
  slug: "vladimir_nabokov";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Volhynia.mdx": {
	id: "Volhynia.mdx";
  slug: "volhynia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wade_Miley.mdx": {
	id: "Wade_Miley.mdx";
  slug: "wade_miley";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wahab_Akbar.mdx": {
	id: "Wahab_Akbar.mdx";
  slug: "wahab_akbar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wajed_Ali_Khan_Panni.mdx": {
	id: "Wajed_Ali_Khan_Panni.mdx";
  slug: "wajed_ali_khan_panni";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Walafrid_Strabo.mdx": {
	id: "Walafrid_Strabo.mdx";
  slug: "walafrid_strabo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wally_Hickel.mdx": {
	id: "Wally_Hickel.mdx";
  slug: "wally_hickel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Walt_Disney.mdx": {
	id: "Walt_Disney.mdx";
  slug: "walt_disney";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Walter_Chrysler.mdx": {
	id: "Walter_Chrysler.mdx";
  slug: "walter_chrysler";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Walter_Jackson_Freeman_II.mdx": {
	id: "Walter_Jackson_Freeman_II.mdx";
  slug: "walter_jackson_freeman_ii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Walther_Funk.mdx": {
	id: "Walther_Funk.mdx";
  slug: "walther_funk";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wanli_Emperor.mdx": {
	id: "Wanli_Emperor.mdx";
  slug: "wanli_emperor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Warren_Mitchell.mdx": {
	id: "Warren_Mitchell.mdx";
  slug: "warren_mitchell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wendy_Carlos.mdx": {
	id: "Wendy_Carlos.mdx";
  slug: "wendy_carlos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wes_Santee.mdx": {
	id: "Wes_Santee.mdx";
  slug: "wes_santee";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"West_Bank.mdx": {
	id: "West_Bank.mdx";
  slug: "west_bank";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"West_Lothian_question.mdx": {
	id: "West_Lothian_question.mdx";
  slug: "west_lothian_question";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Westboro_Baptist_Church.mdx": {
	id: "Westboro_Baptist_Church.mdx";
  slug: "westboro_baptist_church";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Western_Sahara.mdx": {
	id: "Western_Sahara.mdx";
  slug: "western_sahara";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Westminster_Abbey.mdx": {
	id: "Westminster_Abbey.mdx";
  slug: "westminster_abbey";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"White_House_Deputy_Chief_of_Staff.mdx": {
	id: "White_House_Deputy_Chief_of_Staff.mdx";
  slug: "white_house_deputy_chief_of_staff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Whoopi_Goldberg.mdx": {
	id: "Whoopi_Goldberg.mdx";
  slug: "whoopi_goldberg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_Ames.mdx": {
	id: "William_Ames.mdx";
  slug: "william_ames";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_Bradford_Huie.mdx": {
	id: "William_Bradford_Huie.mdx";
  slug: "william_bradford_huie";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_Halford.mdx": {
	id: "William_Halford.mdx";
  slug: "william_halford";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_III_of_England.mdx": {
	id: "William_III_of_England.mdx";
  slug: "william_iii_of_england";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_Steig.mdx": {
	id: "William_Steig.mdx";
  slug: "william_steig";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"William_Taubman.mdx": {
	id: "William_Taubman.mdx";
  slug: "william_taubman";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wilmington_and_Weldon_Railroad.mdx": {
	id: "Wilmington_and_Weldon_Railroad.mdx";
  slug: "wilmington_and_weldon_railroad";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"World_Diabetes_Day.mdx": {
	id: "World_Diabetes_Day.mdx";
  slug: "world_diabetes_day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"World_Kindness_Day.mdx": {
	id: "World_Kindness_Day.mdx";
  slug: "world_kindness_day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"World_War_I.mdx": {
	id: "World_War_I.mdx";
  slug: "world_war_i";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"World_War_II.mdx": {
	id: "World_War_II.mdx";
  slug: "world_war_ii";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Wright_brothers.mdx": {
	id: "Wright_brothers.mdx";
  slug: "wright_brothers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Xavier_Nady.mdx": {
	id: "Xavier_Nady.mdx";
  slug: "xavier_nady";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Yanni.mdx": {
	id: "Yanni.mdx";
  slug: "yanni";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Yolande_of_Aragon.mdx": {
	id: "Yolande_of_Aragon.mdx";
  slug: "yolande_of_aragon";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Yu_Mengyu.mdx": {
	id: "Yu_Mengyu.mdx";
  slug: "yu_mengyu";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Zaian_War.mdx": {
	id: "Zaian_War.mdx";
  slug: "zaian_war";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Zamboanga_City.mdx": {
	id: "Zamboanga_City.mdx";
  slug: "zamboanga_city";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Zhang_Yimou.mdx": {
	id: "Zhang_Yimou.mdx";
  slug: "zhang_yimou";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Zoe_Laskari.mdx": {
	id: "Zoe_Laskari.mdx";
  slug: "zoe_laskari";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"Zulfiqer_Russell.mdx": {
	id: "Zulfiqer_Russell.mdx";
  slug: "zulfiqer_russell";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"first-post.md": {
	id: "first-post.md";
  slug: "first-post";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"markdown-style-guide.md": {
	id: "markdown-style-guide.md";
  slug: "markdown-style-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"second-post.md": {
	id: "second-post.md";
  slug: "second-post";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"third-post.md": {
	id: "third-post.md";
  slug: "third-post";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-mdx.mdx": {
	id: "using-mdx.mdx";
  slug: "using-mdx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
