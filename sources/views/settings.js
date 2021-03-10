
import {JetView} from "webix-jet";
export default class SettingsView extends JetView{

	config(){
		const lang = this.app.getService("locale").getLang();

		const locale_segments	=	{
			view:"segmented",
			value:lang,
			optionWidth:120, inputWidth:250, align:"right",
			options:[
				{ id:"en", value:"En" },
				{ id:"ru", value:"Ru" }
			],
			click:() => this.toggleLanguage()
		};

		return { rows:[locale_segments, {}] };
		//return locale_segments;
	}

	toggleLanguage(){
		const langs = this.app.getService("locale");
		//const value = this.getRoot().getValue();
		const value = this.getRoot().queryView("segmented").getValue();
		langs.setLang(value);
	}

}
