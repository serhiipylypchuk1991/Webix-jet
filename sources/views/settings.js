
import {JetView} from "webix-jet";
export default class SettingsView extends JetView{

	config(){
		const lang = this.app.getService("locale").getLang();

		const locale_segments	=	{
			view:"segmented",
			value:lang,
			optionWidth:40, inputWidth:100, align:"right",
			options:[
				{ id:"en", value:"En" },
				{ id:"ru", value:"Ru" }
			],
			click:() => this.toggleLanguage()
		};

		return locale_segments;
	}

	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().getValue();
		langs.setLang(value);
	}

}
