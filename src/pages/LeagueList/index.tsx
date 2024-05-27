import { PagePortal } from "@libs/components/template/PageHeaderPortal";
import { useGetAllLeaguesQuery } from "@libs/features/services";
import { useEffect, useMemo, useState } from "react";
import { ISearchLeagueRequest } from "@libs/dtos/request/leauge.request";
import { toQueryString } from "@libs/utils/helper/toQueryString";
import Select from "@libs/components/ui/Select";
import DataTable from "@libs/components/shared/DataTable";
import { ILeague } from "@libs/features/leagues/interface";
import { DebounceInput } from "@libs/components/shared/DebounceInput";
import { FiSearch } from "react-icons/fi";
import { removeAttribute } from "@libs/utils/helper/removeAttribute";

const leagueTypes = [
	{ label: "Cup", value: "cup" },
	{ label: "League", value: "league" },
];

const columns = [
	{ id: "id", accessorKey: "id" },
	{ id: "name", accessorKey: "name" },
	{ id: "type", accessorKey: "type" },
];

export default function LeagueList() {
	const [filter, setFilter] = useState<ISearchLeagueRequest>({ type: "cup" });
	const [query, setQuery] = useState(toQueryString(filter));
	const { data, refetch, isFetching } = useGetAllLeaguesQuery(query);

	useEffect(() => {
		refetch();
	}, [refetch, query]);

	const executeQuery = (
		currFilter: ISearchLeagueRequest,
		keyToKeep: keyof ISearchLeagueRequest
	) => {
		const filter = removeAttribute(currFilter, [keyToKeep]);
		setFilter(filter);
		setQuery(toQueryString(filter));
	};

	const handleSelectType = (value: string | undefined) => {
		const currFilter = filter;
		currFilter.type = value as "cup" | "league";
		executeQuery(currFilter, "type");
	};

	const handleSearch = (value: string | number) => {
		if (value) {
			const currFilter = filter;
			filter.search = value as string;
			executeQuery(currFilter, "search");
		}
	};

	const mappedData = useMemo(() => {
		// if (data) {
		// 	const _data: ILeague[] = data?.response.map((item) => ({
		// 		id: item.league.id,
		// 		name: item.league.name,
		// 		type: item.league.type,
		// 	}));
		// 	return _data;
		// }
		return [
			{ id: 1, name: "Topicware", type: "mpenni0" },
			{ id: 2, name: "Youbridge", type: "bwoodroffe1" },
			{ id: 3, name: "Zoomdog", type: "krustidge2" },
			{ id: 4, name: "Snaptags", type: "ccinderey3" },
			{ id: 5, name: "Aivee", type: "tstrike4" },
			{ id: 6, name: "Oyoba", type: "oguarin5" },
			{ id: 7, name: "Brightdog", type: "mwestmorland6" },
			{ id: 8, name: "Kwinu", type: "sjeayes7" },
			{ id: 9, name: "Tagopia", type: "otriggel8" },
			{ id: 10, name: "Rhynyx", type: "zgoodspeed9" },
			{ id: 11, name: "Thoughtworks", type: "eravensa" },
			{ id: 12, name: "Lazz", type: "kdoneldb" },
			{ id: 13, name: "Oba", type: "swisemanc" },
			{ id: 14, name: "Babbleblab", type: "smcswand" },
			{ id: 15, name: "Realbuzz", type: "rudiee" },
			{ id: 16, name: "Chatterbridge", type: "rdurnillf" },
			{ id: 17, name: "Flipstorm", type: "maireg" },
			{ id: 18, name: "Ntags", type: "rwibrewh" },
			{ id: 19, name: "Zoomzone", type: "ntantei" },
			{ id: 20, name: "Latz", type: "lvanderbeekj" },
			{ id: 21, name: "Dynava", type: "abarnbrookk" },
			{ id: 22, name: "Kare", type: "sdoughteryl" },
			{ id: 23, name: "Fiveclub", type: "bvanaccim" },
			{ id: 24, name: "Kwideo", type: "jlaylandn" },
			{ id: 25, name: "Twimbo", type: "aprazoro" },
			{ id: 26, name: "Ntags", type: "dlammertp" },
			{ id: 27, name: "Twitterworks", type: "aandrivelq" },
			{ id: 28, name: "Demimbu", type: "kferrynr" },
			{ id: 29, name: "Kazu", type: "cyells" },
			{ id: 30, name: "Mycat", type: "bweblingt" },
			{ id: 31, name: "Voomm", type: "bcumbridgeu" },
			{ id: 32, name: "Gabvine", type: "twearv" },
			{ id: 33, name: "Youspan", type: "hshepardw" },
			{ id: 34, name: "Browsecat", type: "gmeekx" },
			{ id: 35, name: "Nlounge", type: "eherculesony" },
			{ id: 36, name: "Buzzshare", type: "cnewez" },
			{ id: 37, name: "Jabbersphere", type: "ebawcock10" },
			{ id: 38, name: "Chatterpoint", type: "gshilladay11" },
			{ id: 39, name: "Skimia", type: "akidds12" },
			{ id: 40, name: "Teklist", type: "oheyward13" },
			{ id: 41, name: "Dabvine", type: "ieddoes14" },
			{ id: 42, name: "Avamm", type: "astace15" },
			{ id: 43, name: "Pixoboo", type: "dgrouvel16" },
			{ id: 44, name: "Jaxbean", type: "htreadger17" },
			{ id: 45, name: "Izio", type: "jdeason18" },
			{ id: 46, name: "Quaxo", type: "mbradman19" },
			{ id: 47, name: "Dabshots", type: "egoodday1a" },
			{ id: 48, name: "Teklist", type: "qkeaveney1b" },
			{ id: 49, name: "Devshare", type: "zmingus1c" },
			{ id: 50, name: "Eidel", type: "nblaskett1d" },
			{ id: 51, name: "Ooba", type: "tdarque1e" },
			{ id: 52, name: "Aimbo", type: "ehoggin1f" },
			{ id: 53, name: "Yamia", type: "amerck1g" },
			{ id: 54, name: "Skibox", type: "ekildea1h" },
			{ id: 55, name: "Bluejam", type: "eraccio1i" },
			{ id: 56, name: "Aibox", type: "msettle1j" },
			{ id: 57, name: "Zoombeat", type: "ebelcham1k" },
			{ id: 58, name: "Gabtune", type: "pheugle1l" },
			{ id: 59, name: "Roombo", type: "rbawme1m" },
			{ id: 60, name: "Cogilith", type: "dneath1n" },
			{ id: 61, name: "Oyoloo", type: "lphant1o" },
			{ id: 62, name: "Lazzy", type: "vjansson1p" },
			{ id: 63, name: "Jabbercube", type: "tpettingill1q" },
			{ id: 64, name: "Roombo", type: "vmckearnen1r" },
			{ id: 65, name: "Jabberstorm", type: "bcolleran1s" },
			{ id: 66, name: "Photolist", type: "acoggin1t" },
			{ id: 67, name: "Eazzy", type: "dkettlewell1u" },
			{ id: 68, name: "LiveZ", type: "hlittledyke1v" },
			{ id: 69, name: "Dabshots", type: "meates1w" },
			{ id: 70, name: "Oba", type: "lpindell1x" },
			{ id: 71, name: "Yotz", type: "lhoble1y" },
			{ id: 72, name: "Tagcat", type: "bbaylie1z" },
			{ id: 73, name: "Meezzy", type: "kpedgrift20" },
			{ id: 74, name: "Trilia", type: "lmcglue21" },
			{ id: 75, name: "Photobug", type: "letherton22" },
			{ id: 76, name: "Fiveclub", type: "cettels23" },
			{ id: 77, name: "Fiveclub", type: "rcaughtry24" },
			{ id: 78, name: "Plajo", type: "ljeanet25" },
			{ id: 79, name: "Thoughtworks", type: "cgethen26" },
			{ id: 80, name: "Dynazzy", type: "mperulli27" },
			{ id: 81, name: "Zoonder", type: "swatkinson28" },
			{ id: 82, name: "Skaboo", type: "faskey29" },
			{ id: 83, name: "Muxo", type: "lfagence2a" },
			{ id: 84, name: "Snaptags", type: "dblewett2b" },
			{ id: 85, name: "Bubblemix", type: "rcommucci2c" },
			{ id: 86, name: "Devbug", type: "crigby2d" },
			{ id: 87, name: "Tagtune", type: "cbaversor2e" },
			{ id: 88, name: "Browsetype", type: "iwormell2f" },
			{ id: 89, name: "Photospace", type: "pessam2g" },
			{ id: 90, name: "Jayo", type: "etrobe2h" },
			{ id: 91, name: "Demivee", type: "mdews2i" },
			{ id: 92, name: "Fatz", type: "gyellop2j" },
			{ id: 93, name: "Mydo", type: "htzar2k" },
			{ id: 94, name: "Skidoo", type: "aleas2l" },
			{ id: 95, name: "Thoughtstorm", type: "vlaurentin2m" },
			{ id: 96, name: "Fanoodle", type: "fragg2n" },
			{ id: 97, name: "Thoughtstorm", type: "gdemko2o" },
			{ id: 98, name: "Skyvu", type: "jchadbourn2p" },
			{ id: 99, name: "Tagchat", type: "tlashford2q" },
			{ id: 100, name: "Chatterpoint", type: "atremellan2r" },
			{ id: 101, name: "Edgeblab", type: "gellery2s" },
			{ id: 102, name: "Dynabox", type: "gshave2t" },
			{ id: 103, name: "Wordify", type: "acromblehome2u" },
			{ id: 104, name: "Browseblab", type: "coke2v" },
			{ id: 105, name: "Edgeclub", type: "kgillbard2w" },
			{ id: 106, name: "Ainyx", type: "pmussilli2x" },
			{ id: 107, name: "Shufflester", type: "kkissell2y" },
			{ id: 108, name: "Chatterbridge", type: "cpywell2z" },
			{ id: 109, name: "Gabspot", type: "lbaltrushaitis30" },
			{ id: 110, name: "Oodoo", type: "rmulligan31" },
			{ id: 111, name: "Meetz", type: "glutsch32" },
			{ id: 112, name: "Flashpoint", type: "mdeandreis33" },
			{ id: 113, name: "Yozio", type: "pthicking34" },
			{ id: 114, name: "Edgeblab", type: "holenikov35" },
			{ id: 115, name: "Jabberbean", type: "mbrockie36" },
			{ id: 116, name: "Eire", type: "vdrowsfield37" },
			{ id: 117, name: "Jamia", type: "mshuard38" },
			{ id: 118, name: "Kazio", type: "erozzell39" },
			{ id: 119, name: "Feednation", type: "hdragonette3a" },
			{ id: 120, name: "Zoonoodle", type: "mmartindale3b" },
			{ id: 121, name: "Fliptune", type: "ciacobo3c" },
			{ id: 122, name: "Skyndu", type: "zharnott3d" },
			{ id: 123, name: "Yodoo", type: "rmulvin3e" },
			{ id: 124, name: "Gabspot", type: "shebble3f" },
			{ id: 125, name: "Thoughtbridge", type: "broome3g" },
			{ id: 126, name: "Kanoodle", type: "sgarrow3h" },
			{ id: 127, name: "Topicware", type: "rliston3i" },
			{ id: 128, name: "Trunyx", type: "smanchester3j" },
			{ id: 129, name: "Wordware", type: "awaterhous3k" },
			{ id: 130, name: "Photolist", type: "bseleway3l" },
			{ id: 131, name: "Brainsphere", type: "aolyhane3m" },
			{ id: 132, name: "Layo", type: "efotherby3n" },
			{ id: 133, name: "Plajo", type: "gmaclese3o" },
			{ id: 134, name: "Edgetag", type: "jtomlins3p" },
			{ id: 135, name: "Vipe", type: "jlargent3q" },
			{ id: 136, name: "Buzzshare", type: "dcantwell3r" },
			{ id: 137, name: "Kayveo", type: "bpirson3s" },
			{ id: 138, name: "Demivee", type: "jlebell3t" },
			{ id: 139, name: "Roombo", type: "fkellard3u" },
			{ id: 140, name: "Feedfire", type: "aaldersey3v" },
			{ id: 141, name: "Divape", type: "cstride3w" },
			{ id: 142, name: "Kwilith", type: "baishford3x" },
			{ id: 143, name: "Photobug", type: "bdorrity3y" },
			{ id: 144, name: "Meevee", type: "rjurczyk3z" },
			{ id: 145, name: "Devcast", type: "fainscow40" },
			{ id: 146, name: "Voolith", type: "sskates41" },
			{ id: 147, name: "Plambee", type: "bdallison42" },
			{ id: 148, name: "Livetube", type: "bwalkley43" },
			{ id: 149, name: "Avavee", type: "jyaldren44" },
			{ id: 150, name: "Eamia", type: "theales45" },
			{ id: 151, name: "Quinu", type: "flawrie46" },
			{ id: 152, name: "Livepath", type: "csimison47" },
			{ id: 153, name: "Tazz", type: "dcausbey48" },
			{ id: 154, name: "Trunyx", type: "pgoodright49" },
			{ id: 155, name: "Meejo", type: "mtenby4a" },
			{ id: 156, name: "Zoomlounge", type: "cshuter4b" },
			{ id: 157, name: "Rhynoodle", type: "cambroziak4c" },
			{ id: 158, name: "Fiveclub", type: "cmacconneely4d" },
			{ id: 159, name: "Dabshots", type: "epol4e" },
			{ id: 160, name: "Photojam", type: "oebbins4f" },
			{ id: 161, name: "Oyondu", type: "fdarben4g" },
			{ id: 162, name: "Roomm", type: "rcrocken4h" },
			{ id: 163, name: "Yambee", type: "bsnelling4i" },
			{ id: 164, name: "Realcube", type: "bjertz4j" },
			{ id: 165, name: "Pixope", type: "mstarkings4k" },
			{ id: 166, name: "Skimia", type: "slonding4l" },
			{ id: 167, name: "Dynabox", type: "kredholls4m" },
			{ id: 168, name: "Tagpad", type: "bmccard4n" },
			{ id: 169, name: "Gigaclub", type: "tdifrisco4o" },
			{ id: 170, name: "Buzzster", type: "vlorroway4p" },
			{ id: 171, name: "Cogilith", type: "rfigures4q" },
			{ id: 172, name: "Youopia", type: "mbaxter4r" },
			{ id: 173, name: "Twitterlist", type: "edowdeswell4s" },
			{ id: 174, name: "Cogidoo", type: "jbramley4t" },
			{ id: 175, name: "Twitterwire", type: "mkonerding4u" },
			{ id: 176, name: "Zava", type: "acastells4v" },
			{ id: 177, name: "Vipe", type: "afalconer4w" },
			{ id: 178, name: "Tagchat", type: "hbullier4x" },
			{ id: 179, name: "Vitz", type: "vmowday4y" },
			{ id: 180, name: "Browsedrive", type: "ahacard4z" },
			{ id: 181, name: "Avamba", type: "dwyeld50" },
			{ id: 182, name: "Blogtag", type: "fpiggin51" },
			{ id: 183, name: "Oyoloo", type: "mkellog52" },
			{ id: 184, name: "Photofeed", type: "jcaras53" },
			{ id: 185, name: "Oyoloo", type: "rmassie54" },
			{ id: 186, name: "Skyndu", type: "fyakovich55" },
			{ id: 187, name: "Browsedrive", type: "gbertlin56" },
			{ id: 188, name: "Blogpad", type: "psleightholm57" },
			{ id: 189, name: "Roombo", type: "edisbrow58" },
			{ id: 190, name: "Leexo", type: "ckeston59" },
			{ id: 191, name: "Gabspot", type: "mannand5a" },
			{ id: 192, name: "Viva", type: "cwoolard5b" },
			{ id: 193, name: "Aimbu", type: "amelson5c" },
			{ id: 194, name: "Mynte", type: "vpalombi5d" },
			{ id: 195, name: "Trudeo", type: "jyurkiewicz5e" },
			{ id: 196, name: "Abata", type: "heseler5f" },
			{ id: 197, name: "Innotype", type: "adaughton5g" },
			{ id: 198, name: "Avavee", type: "gvellacott5h" },
			{ id: 199, name: "Dabjam", type: "mperfitt5i" },
			{ id: 200, name: "Meembee", type: "gbaggally5j" },
			{ id: 201, name: "Dablist", type: "mwraighte5k" },
			{ id: 202, name: "Eimbee", type: "ccarryer5l" },
			{ id: 203, name: "Jabbercube", type: "cmcgunley5m" },
			{ id: 204, name: "Yamia", type: "ccaught5n" },
			{ id: 205, name: "Brainsphere", type: "dkennford5o" },
			{ id: 206, name: "Dynazzy", type: "rstivey5p" },
			{ id: 207, name: "Yambee", type: "twroth5q" },
			{ id: 208, name: "Yambee", type: "rorringe5r" },
			{ id: 209, name: "Vidoo", type: "rdoxsey5s" },
			{ id: 210, name: "Yakijo", type: "apavinese5t" },
			{ id: 211, name: "Realcube", type: "bivetts5u" },
			{ id: 212, name: "Avamba", type: "mfruser5v" },
			{ id: 213, name: "Eare", type: "edarrington5w" },
			{ id: 214, name: "Yodoo", type: "afitton5x" },
			{ id: 215, name: "Livepath", type: "aspatarul5y" },
			{ id: 216, name: "Browsezoom", type: "tbeckwith5z" },
			{ id: 217, name: "Brainsphere", type: "nemloch60" },
			{ id: 218, name: "Oodoo", type: "cludron61" },
			{ id: 219, name: "Dynazzy", type: "bskully62" },
			{ id: 220, name: "Innotype", type: "mgiacometti63" },
			{ id: 221, name: "Edgetag", type: "sbuddle64" },
			{ id: 222, name: "Kanoodle", type: "sthoresby65" },
			{ id: 223, name: "Vinte", type: "bvinall66" },
			{ id: 224, name: "Twitterbridge", type: "rdewar67" },
			{ id: 225, name: "Demizz", type: "efranckton68" },
			{ id: 226, name: "Rhybox", type: "mramsted69" },
			{ id: 227, name: "Einti", type: "mhutchison6a" },
			{ id: 228, name: "Dabshots", type: "okmiec6b" },
			{ id: 229, name: "Aibox", type: "sgullan6c" },
			{ id: 230, name: "Oodoo", type: "lcall6d" },
			{ id: 231, name: "Thoughtstorm", type: "tkarpenko6e" },
			{ id: 232, name: "Fanoodle", type: "wondricek6f" },
			{ id: 233, name: "Aimbo", type: "tdyerson6g" },
			{ id: 234, name: "Brainlounge", type: "ndivill6h" },
			{ id: 235, name: "Kimia", type: "dhammill6i" },
			{ id: 236, name: "Dabjam", type: "edionisii6j" },
			{ id: 237, name: "Eayo", type: "dbaignard6k" },
			{ id: 238, name: "Geba", type: "jlongley6l" },
			{ id: 239, name: "Thoughtblab", type: "klavin6m" },
			{ id: 240, name: "Oodoo", type: "ppinock6n" },
			{ id: 241, name: "Yombu", type: "ndeniso6o" },
			{ id: 242, name: "InnoZ", type: "gtollow6p" },
			{ id: 243, name: "Avamm", type: "dwiddall6q" },
			{ id: 244, name: "Kayveo", type: "njachimiak6r" },
			{ id: 245, name: "Edgepulse", type: "owordesworth6s" },
			{ id: 246, name: "Riffwire", type: "nfrowing6t" },
			{ id: 247, name: "Edgepulse", type: "jsweetzer6u" },
			{ id: 248, name: "Kamba", type: "spaybody6v" },
			{ id: 249, name: "Snaptags", type: "epagin6w" },
			{ id: 250, name: "Photobug", type: "nyurygyn6x" },
			{ id: 251, name: "Edgeify", type: "cvasiljevic6y" },
			{ id: 252, name: "Jayo", type: "nvango6z" },
			{ id: 253, name: "Jaxworks", type: "ghutton70" },
			{ id: 254, name: "Yombu", type: "crubenfeld71" },
			{ id: 255, name: "Tagopia", type: "jmazzei72" },
			{ id: 256, name: "Shuffletag", type: "rwillacot73" },
			{ id: 257, name: "Bubbletube", type: "ngoolden74" },
			{ id: 258, name: "Tagpad", type: "bfincham75" },
			{ id: 259, name: "Yambee", type: "hcroisdall76" },
			{ id: 260, name: "Quamba", type: "hcharle77" },
			{ id: 261, name: "Thoughtblab", type: "efist78" },
			{ id: 262, name: "Skyba", type: "wchadband79" },
			{ id: 263, name: "Dynazzy", type: "maveline7a" },
			{ id: 264, name: "Edgepulse", type: "lraeburn7b" },
			{ id: 265, name: "Skipfire", type: "kjaquet7c" },
			{ id: 266, name: "Realcube", type: "pmacgillavery7d" },
			{ id: 267, name: "Kimia", type: "szarfati7e" },
			{ id: 268, name: "Twitterworks", type: "acharles7f" },
			{ id: 269, name: "Jamia", type: "sdionisio7g" },
			{ id: 270, name: "Edgeblab", type: "jperelli7h" },
			{ id: 271, name: "Babbleopia", type: "lforten7i" },
			{ id: 272, name: "Fivespan", type: "ghuygen7j" },
			{ id: 273, name: "Kaymbo", type: "jhencke7k" },
			{ id: 274, name: "Zooveo", type: "tsilverston7l" },
			{ id: 275, name: "Quimm", type: "cluetchford7m" },
			{ id: 276, name: "Quatz", type: "jscannell7n" },
			{ id: 277, name: "Twitternation", type: "mbrookshaw7o" },
			{ id: 278, name: "Riffwire", type: "dbazoge7p" },
			{ id: 279, name: "Dabvine", type: "olillico7q" },
			{ id: 280, name: "Fiveclub", type: "tlocksley7r" },
			{ id: 281, name: "Skyba", type: "rclaxson7s" },
			{ id: 282, name: "Skiba", type: "dmaster7t" },
			{ id: 283, name: "Bluejam", type: "aluscott7u" },
			{ id: 284, name: "Meezzy", type: "gbernadzki7v" },
			{ id: 285, name: "Jaxbean", type: "kgrotty7w" },
			{ id: 286, name: "Reallinks", type: "gelwyn7x" },
			{ id: 287, name: "Dazzlesphere", type: "hfullun7y" },
			{ id: 288, name: "Bluezoom", type: "cglassborow7z" },
			{ id: 289, name: "Oyoyo", type: "gdeekes80" },
			{ id: 290, name: "Topiczoom", type: "hpeach81" },
			{ id: 291, name: "Oyondu", type: "cchasle82" },
			{ id: 292, name: "Muxo", type: "ldumblton83" },
			{ id: 293, name: "Yamia", type: "bjeafferson84" },
			{ id: 294, name: "Twitternation", type: "gduffield85" },
			{ id: 295, name: "Yakitri", type: "ccardozo86" },
			{ id: 296, name: "Yabox", type: "kdunphy87" },
			{ id: 297, name: "Yacero", type: "kmacentee88" },
			{ id: 298, name: "Janyx", type: "nprigg89" },
			{ id: 299, name: "Jabbercube", type: "hianilli8a" },
			{ id: 300, name: "Eire", type: "yhurburt8b" },
			{ id: 301, name: "Dabvine", type: "wmegarry8c" },
			{ id: 302, name: "Meevee", type: "livanovic8d" },
			{ id: 303, name: "Meevee", type: "ymant8e" },
			{ id: 304, name: "Mydo", type: "bdellorto8f" },
			{ id: 305, name: "Livepath", type: "hdenyagin8g" },
			{ id: 306, name: "Tagpad", type: "escamerdine8h" },
			{ id: 307, name: "Jaxspan", type: "challad8i" },
			{ id: 308, name: "Aivee", type: "kison8j" },
			{ id: 309, name: "Quimba", type: "abysouth8k" },
			{ id: 310, name: "Gigazoom", type: "dphifer8l" },
			{ id: 311, name: "Wordify", type: "gsouthard8m" },
			{ id: 312, name: "Jayo", type: "chodcroft8n" },
			{ id: 313, name: "Talane", type: "tbathersby8o" },
			{ id: 314, name: "Twitterbridge", type: "rmcmorran8p" },
			{ id: 315, name: "Meevee", type: "dlumsdon8q" },
			{ id: 316, name: "Mynte", type: "bnobes8r" },
			{ id: 317, name: "Skipstorm", type: "gferreli8s" },
			{ id: 318, name: "Cogilith", type: "twheldon8t" },
			{ id: 319, name: "Jamia", type: "sforsaith8u" },
			{ id: 320, name: "Mita", type: "slasslett8v" },
			{ id: 321, name: "Quaxo", type: "gchorley8w" },
			{ id: 322, name: "Minyx", type: "lwarnes8x" },
			{ id: 323, name: "Gabspot", type: "wtuer8y" },
			{ id: 324, name: "Skyvu", type: "tmerfin8z" },
			{ id: 325, name: "Oyope", type: "nstollberg90" },
			{ id: 326, name: "Mybuzz", type: "mtullis91" },
			{ id: 327, name: "Photobug", type: "rkindley92" },
			{ id: 328, name: "JumpXS", type: "carnholtz93" },
			{ id: 329, name: "Jabberstorm", type: "glawtey94" },
			{ id: 330, name: "Cogibox", type: "csharpling95" },
			{ id: 331, name: "Digitube", type: "acoggeshall96" },
			{ id: 332, name: "Roombo", type: "kbartholomieu97" },
			{ id: 333, name: "Twinte", type: "jsedgemore98" },
			{ id: 334, name: "Buzzbean", type: "rmartinelli99" },
			{ id: 335, name: "Ozu", type: "kferie9a" },
			{ id: 336, name: "Quatz", type: "hrix9b" },
			{ id: 337, name: "Skinder", type: "ishiliton9c" },
			{ id: 338, name: "Browsebug", type: "glisciardelli9d" },
			{ id: 339, name: "Bluejam", type: "bhattiff9e" },
			{ id: 340, name: "Skynoodle", type: "vchettoe9f" },
			{ id: 341, name: "Trudeo", type: "ccattach9g" },
			{ id: 342, name: "Tagpad", type: "kmckerron9h" },
			{ id: 343, name: "Ntag", type: "nrundle9i" },
			{ id: 344, name: "Centizu", type: "ihefferan9j" },
			{ id: 345, name: "Twiyo", type: "mdallimore9k" },
			{ id: 346, name: "Voomm", type: "cbagg9l" },
			{ id: 347, name: "Voomm", type: "ispyer9m" },
			{ id: 348, name: "Oyoba", type: "atryme9n" },
			{ id: 349, name: "Leexo", type: "eblaydon9o" },
			{ id: 350, name: "Jetwire", type: "sspeed9p" },
			{ id: 351, name: "Trilia", type: "tsheryne9q" },
			{ id: 352, name: "Vimbo", type: "dfetteplace9r" },
			{ id: 353, name: "Ntags", type: "ddedantesie9s" },
			{ id: 354, name: "Tagcat", type: "ggeall9t" },
			{ id: 355, name: "Edgewire", type: "kfullegar9u" },
			{ id: 356, name: "Oozz", type: "lcorkitt9v" },
			{ id: 357, name: "Dabshots", type: "mconaboy9w" },
			{ id: 358, name: "Wordify", type: "aguys9x" },
			{ id: 359, name: "Jamia", type: "ecallard9y" },
			{ id: 360, name: "Photobug", type: "dblacktin9z" },
			{ id: 361, name: "Zooveo", type: "nmildenhalla0" },
			{ id: 362, name: "Dabfeed", type: "bjakoubeka1" },
			{ id: 363, name: "Thoughtbeat", type: "wbalaisota2" },
			{ id: 364, name: "Voolith", type: "nsainera3" },
			{ id: 365, name: "Tanoodle", type: "jsailesa4" },
			{ id: 366, name: "Gabtype", type: "cmaniloa5" },
			{ id: 367, name: "Tagopia", type: "afedorskia6" },
			{ id: 368, name: "Youspan", type: "hoclovana7" },
			{ id: 369, name: "Zoomlounge", type: "sattacka8" },
			{ id: 370, name: "Zava", type: "hgreenalfa9" },
			{ id: 371, name: "Jabbersphere", type: "cmationaa" },
			{ id: 372, name: "Feedfish", type: "omcaleeseab" },
			{ id: 373, name: "Oyoloo", type: "cskewisac" },
			{ id: 374, name: "Nlounge", type: "acopoad" },
			{ id: 375, name: "Cogidoo", type: "wfelgatae" },
			{ id: 376, name: "Skivee", type: "junwinaf" },
			{ id: 377, name: "Wikido", type: "mbrachellag" },
			{ id: 378, name: "Eare", type: "asydallah" },
			{ id: 379, name: "Brainlounge", type: "bvereai" },
			{ id: 380, name: "Avamm", type: "ogravieaj" },
			{ id: 381, name: "Dabfeed", type: "jgreydonak" },
			{ id: 382, name: "Kanoodle", type: "ldavorenal" },
			{ id: 383, name: "Buzzster", type: "jtenpennyam" },
			{ id: 384, name: "Skilith", type: "amarlinan" },
			{ id: 385, name: "Tagopia", type: "ryuryichevao" },
			{ id: 386, name: "Zoomcast", type: "casplingap" },
			{ id: 387, name: "Wordpedia", type: "bboissieraq" },
			{ id: 388, name: "Twitterworks", type: "fsalesar" },
			{ id: 389, name: "Riffpedia", type: "fshanahanas" },
			{ id: 390, name: "Cogidoo", type: "gruppeleat" },
			{ id: 391, name: "Photospace", type: "ahammattau" },
			{ id: 392, name: "Rhynoodle", type: "rjollandav" },
			{ id: 393, name: "Demivee", type: "rjouningaw" },
			{ id: 394, name: "Wikivu", type: "vdeavinax" },
			{ id: 395, name: "Thoughtworks", type: "lcossentineay" },
			{ id: 396, name: "Browseblab", type: "ttofpikaz" },
			{ id: 397, name: "Edgeify", type: "knicholasb0" },
			{ id: 398, name: "Zoonoodle", type: "lcalcraftb1" },
			{ id: 399, name: "Trilia", type: "mpyerb2" },
			{ id: 400, name: "Vipe", type: "mbanaszewskib3" },
			{ id: 401, name: "Zooveo", type: "lfortnamb4" },
			{ id: 402, name: "Riffpath", type: "rgregolettib5" },
			{ id: 403, name: "Gabtype", type: "adecastrib6" },
			{ id: 404, name: "Twimm", type: "cestcotb7" },
			{ id: 405, name: "Browsezoom", type: "nrickaertb8" },
			{ id: 406, name: "Voomm", type: "pmunnionb9" },
			{ id: 407, name: "Topdrive", type: "thaineyba" },
			{ id: 408, name: "Topicstorm", type: "ckebbellbb" },
			{ id: 409, name: "Jaxworks", type: "ccolecroughbc" },
			{ id: 410, name: "Jabberstorm", type: "mkimberlybd" },
			{ id: 411, name: "Brainlounge", type: "mchoakbe" },
			{ id: 412, name: "Voomm", type: "woldlandbf" },
			{ id: 413, name: "Cogilith", type: "lnicollsbg" },
			{ id: 414, name: "Livetube", type: "rmercybh" },
			{ id: 415, name: "Realbuzz", type: "kbuscombebi" },
			{ id: 416, name: "Avamba", type: "anortheybj" },
			{ id: 417, name: "Skiba", type: "gshillingbk" },
			{ id: 418, name: "Demimbu", type: "beriebl" },
			{ id: 419, name: "Babbleopia", type: "tresdalebm" },
			{ id: 420, name: "Topicshots", type: "lartoisbn" },
			{ id: 421, name: "Tanoodle", type: "bmaccartairbo" },
			{ id: 422, name: "Devshare", type: "gduggetbp" },
			{ id: 423, name: "Trilith", type: "kramplingbq" },
			{ id: 424, name: "Trilia", type: "bpawelskibr" },
			{ id: 425, name: "Yozio", type: "mdecleynebs" },
			{ id: 426, name: "Yamia", type: "sblodgbt" },
			{ id: 427, name: "Yombu", type: "wgoublierbu" },
			{ id: 428, name: "Lazzy", type: "thoustonbv" },
			{ id: 429, name: "Browsecat", type: "rkerridgebw" },
			{ id: 430, name: "Gabspot", type: "gvedishchevbx" },
			{ id: 431, name: "Midel", type: "arederby" },
			{ id: 432, name: "Quire", type: "lhumphersonbz" },
			{ id: 433, name: "Rhycero", type: "bgearingc0" },
			{ id: 434, name: "Dabfeed", type: "lwoodroofc1" },
			{ id: 435, name: "Kare", type: "mdugganc2" },
			{ id: 436, name: "Edgetag", type: "fraccioc3" },
			{ id: 437, name: "Buzzbean", type: "bgilksc4" },
			{ id: 438, name: "Blogpad", type: "mmckiniec5" },
			{ id: 439, name: "Skyvu", type: "dleaderc6" },
			{ id: 440, name: "Edgeify", type: "wcoodec7" },
			{ id: 441, name: "Quimba", type: "worsayc8" },
			{ id: 442, name: "Edgewire", type: "bgaywoodc9" },
			{ id: 443, name: "Jabberbean", type: "asalvidgeca" },
			{ id: 444, name: "Mydeo", type: "rmalebycb" },
			{ id: 445, name: "Brainverse", type: "lmidnercc" },
			{ id: 446, name: "Zava", type: "ngravestoncd" },
			{ id: 447, name: "Babblestorm", type: "jreynishce" },
			{ id: 448, name: "Kwimbee", type: "fcarrabottcf" },
			{ id: 449, name: "Blogtag", type: "vcotelardcg" },
			{ id: 450, name: "Feedfish", type: "sbarberch" },
			{ id: 451, name: "Thoughtbridge", type: "nlewsieci" },
			{ id: 452, name: "Youtags", type: "mattargecj" },
			{ id: 453, name: "Dabshots", type: "janthonyck" },
			{ id: 454, name: "Feedfish", type: "lhamoncl" },
			{ id: 455, name: "Youtags", type: "vlebarrcm" },
			{ id: 456, name: "Einti", type: "japfelmanncn" },
			{ id: 457, name: "Twitterbeat", type: "ddavittco" },
			{ id: 458, name: "Shufflester", type: "etoraldcp" },
			{ id: 459, name: "Voonyx", type: "lhirschmanncq" },
			{ id: 460, name: "Trudeo", type: "mdomleocr" },
			{ id: 461, name: "Npath", type: "rkoubucs" },
			{ id: 462, name: "Skipfire", type: "dbradshawct" },
			{ id: 463, name: "Realbuzz", type: "rhurchecu" },
			{ id: 464, name: "Voonder", type: "tbendelowcv" },
			{ id: 465, name: "Topicshots", type: "uothickcw" },
			{ id: 466, name: "Brightdog", type: "cwinterfloodcx" },
			{ id: 467, name: "Divanoodle", type: "evedyashkincy" },
			{ id: 468, name: "Layo", type: "pstriplingcz" },
			{ id: 469, name: "Miboo", type: "agarnsond0" },
			{ id: 470, name: "Zooveo", type: "rbouldond1" },
			{ id: 471, name: "Mydo", type: "slicciardiellod2" },
			{ id: 472, name: "Centimia", type: "astatterd3" },
			{ id: 473, name: "Fatz", type: "pjessopd4" },
			{ id: 474, name: "Tagcat", type: "bembersond5" },
			{ id: 475, name: "Dabvine", type: "sschulzed6" },
			{ id: 476, name: "Bluejam", type: "nhaycroftd7" },
			{ id: 477, name: "Dazzlesphere", type: "hriefd8" },
			{ id: 478, name: "Gabvine", type: "mdeaned9" },
			{ id: 479, name: "Podcat", type: "cwheaterda" },
			{ id: 480, name: "Riffpedia", type: "csidlowdb" },
			{ id: 481, name: "Kimia", type: "otrenchdc" },
			{ id: 482, name: "Shufflester", type: "llonghornedd" },
			{ id: 483, name: "Mydo", type: "mstalmande" },
			{ id: 484, name: "Yakijo", type: "tdodshundf" },
			{ id: 485, name: "Mita", type: "lblanchflowerdg" },
			{ id: 486, name: "Skalith", type: "sgutdh" },
			{ id: 487, name: "Bubblemix", type: "gburgoynedi" },
			{ id: 488, name: "Meembee", type: "astledgerdj" },
			{ id: 489, name: "Tagpad", type: "mkleinhausdk" },
			{ id: 490, name: "Jetpulse", type: "bcatterilldl" },
			{ id: 491, name: "Brainlounge", type: "gbottomsdm" },
			{ id: 492, name: "Lajo", type: "gtierneydn" },
			{ id: 493, name: "Leenti", type: "pmaccallumdo" },
			{ id: 494, name: "Jabberstorm", type: "elavarackdp" },
			{ id: 495, name: "Bubbletube", type: "ctoplindq" },
			{ id: 496, name: "Layo", type: "pduffriedr" },
			{ id: 497, name: "Kimia", type: "tdowsettds" },
			{ id: 498, name: "Jaloo", type: "tlobelldt" },
			{ id: 499, name: "Aivee", type: "kblooredu" },
			{ id: 500, name: "Gigazoom", type: "slavarackdv" },
		];
	}, []);

	const pagingData = useMemo(() => {
		if (data) {
			return {
				total: data?.paging.total,
				pageIndex: data?.paging.current,
				pageSize: 100,
			};
		}
	}, [data]);

	return (
		<div>
			<PagePortal>
				<div className="flex items-center gap-3">
					<DebounceInput
						value=""
						type="text"
						onChange={handleSearch}
						placeholder="Search by name or country"
						extra="min-w-[15rem]"
						leftIcon={<FiSearch />}
					/>

					<Select
						className="w-[8rem]"
						options={leagueTypes}
						onChange={(opt) => handleSelectType(opt?.value)}
						value={leagueTypes.filter(
							(type) => type.value === filter.type
						)}
						isDisabled={isFetching}
					/>
				</div>
			</PagePortal>
			<div>
				<DataTable
					columns={columns}
					data={mappedData}
					// loading={isFetching}
					pagingData={pagingData}
				/>
			</div>
		</div>
	);
}
