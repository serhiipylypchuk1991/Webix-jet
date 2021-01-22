import {JetView} from "webix-jet";
import {textValidation} from "models/validate_function";
import {scrollToLastAddedElemen} from "models/scroll_function";
export default class GridView extends JetView {
	constructor(app, data){
		super(app);
		this.data = data;
	}
	config(){
		var add_new_button = {
			view:"button",
			value:"Add new",
			css:"webix_primary",
			click:()=>{
				webix.message({text:"New element was added", expire:350});
				this.grid.add({Name:""});
				scrollToLastAddedElemen(this.grid,true,true);
			}
		};
		var datatable = {
			view:"datatable",
			select:true,
			scrollY:true,
			minWidth:400,
			columns:[
				{ id:"Name", header:"Name", editor:"text", fillspace:true, sort:"text"},
				{ id:"del", header:"", template:"{common.trashIcon()}", width:60}
			],
			onClick:{
				"wxi-trash":function(e, id){
					webix.confirm({
						title:"Country"+" would be deleted",
						text:"Do you still want to continue?",
						type:"confirm-warning"
					}).then(() => {
						webix.message({
							text:"Element was deleted",
							type:"info"
						});
						this.remove(id);
						return false;
					},
					function(){
						webix.message("Rejected");
					}
					);
				}
			},
			on:{
				onValidationError:function(id){
					this.unselect(id);
				}
			},
			editable:true,
			rules:{
				Name:function(value){
					return textValidation(value,20);
				}
			}
		};
		return {margin:3, rows:[add_new_button,datatable]};
	}
	init(view){
		this.grid = view.queryView("datatable");
		this.grid.parse(this.data);
	}
}
