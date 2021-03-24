import {JetView} from "webix-jet";
import {textValidation} from "models/validate_function";

export default class GridView extends JetView {
	constructor(app, data){
		super(app);
		this.data = data;
	}

	config(){
		const _ = this.app.getService("locale")._;

		const add_new_button = {
			view:"button",
			value:_("Add new"),
			css:"webix_primary",
			click:() => this.addNewElement()
		};

		const datatable = {
			view:"datatable",
			select:true,
			scrollY:true,
			minWidth:400,
			columns:[
				{ id:"Name", header:_("Name"), editor:"text", fillspace:true, sort:"text"},
				{ id:"del", header:"", template:"{common.trashIcon()}", width:60}
			],
			onClick:{ "wxi-trash":(e,id) => this.removeElement(id) },
			on:{
				onValidationError:function(id){
					this.unselect(id);
				}
			},
			editable:true,
			rules:{
				Name:function(Name){
					return textValidation(Name, 20);
				}
			}
		};

		return {margin:3, rows:[add_new_button,datatable]};
	}

	showAndSelect(id){
		this.grid.showItem(id["id"]);
		this.grid.select(id["id"]);
	}

	addNewElement(){
		const _ = this.app.getService("locale")._;
		webix.message({text:_("New element was added"), expire:350});

		this.data.waitSave(function(){
    	const id_new_elem = this.add({Name:"New"});
		}).then((id_new_elem) => this.showAndSelect(id_new_elem));
	}

	removeElement(id){
		const _ = this.app.getService("locale")._;

		webix.confirm({
			title:_("Element would be deleted"),
			text:_("Do you still want to continue?"),
			type:"confirm-warning"
		}).then(() => {
			webix.message({
				text:_("Element was deleted"),
				type:"info"
			});

			this.data.remove(id);
		},
		function(){
			webix.message(_("Rejected"));
		});
		return false;
	}

	init(view){
		this.grid = view.queryView("datatable");
		this.grid.sync(this.data);
	}

}
