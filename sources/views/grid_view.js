import {JetView} from "webix-jet";
import {textValidation} from "models/validate_function";
import {scrollToLastAddedElemen} from "models/scroll_function";

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
				{ id:"value", header:_("Name"), editor:"text", fillspace:true, sort:"text"},
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
				value:function(value){
					return textValidation(value,20);
				}
			}
		};

		return {margin:3, rows:[add_new_button,datatable]};
	}

	addNewElement(){
		const _ = this.app.getService("locale")._;
		
		webix.message({text:_("New element was added"), expire:350});
		this.data.add({value:"New"});
		scrollToLastAddedElemen(this.grid,true,true);
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

			return false;
		},
		function(){
			webix.message(_("Rejected"));
		});
	}

	init(view){
		this.grid = view.queryView("datatable");
		this.grid.parse(this.data);
	}

}
