import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{

	config(){
		
		var header = {
			type:"header", template:"My App"
		};

		var menu = {
			view:"menu", id:"top_menu",
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon #icon#'></span> #value# ",
			data:[
				{ value:"Contacts", id:"contacts", icon:"wxi-user"},
				{ value:"Data", id:"data", icon:"wxi-pencil"},
				{ value:"Settings", id:"settings", icon:"wxi-dots"}
			]
		};

		var ui = {
			 cols:[
				{rows:[{rows:[header, menu]}]},
				{rows:[
					{ $subview:true }
				]}
			]
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top_menu");
	}
}
