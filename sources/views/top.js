import {JetView} from "webix-jet";
export default class TopView extends JetView{

	config(){
		const _ = this.app.getService("locale")._;

		const header = {
			type:"header", template:_("My App")
		};

		const sidebar = {
			width:300,
			minWidth:250,
			maxWidth:350,
			view:"list",
			scroll:false,
			css:"gray_background",
			select:true,
			data:[
				{ value:_("Contacts"), id:"contacts" },
				{ value:_("Data"), id:"data" },
				{ value:_("Settings"), id:"settings" }
			],
			on:{
				onAfterSelect:(id) => this.show(id)
			}
		};

		const ui = {
			cols:[
				{ rows:[header, sidebar] },
				{ $subview:true }
			]
		};

		return ui;
	}

}
