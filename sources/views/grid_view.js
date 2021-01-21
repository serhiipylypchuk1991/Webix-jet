import {JetView} from "webix-jet";
import {textValidation} from "models/validate_function";
import {scrollToLastAddedElemen} from "models/scroll_function";
  export default class GridView extends JetView {
  constructor(app, component_id, component, data){
    super(app);
    this.component_id = component_id;
    this.component = component;
    this.data = data;
	}
  config(){
    var component_id = this.component_id;
    var component_name = this.component;
    var add_new_button = {
      view:"button",
      value:"Add new",
      css:"webix_primary",
      click:function(){
        webix.message({text:"New element was added", expire:350});
        $$(component_id).add({Name:component_name});
        scrollToLastAddedElemen($$(component_id),true,true);
      }
    };
    var datatable = {
      view:"datatable",
      id:component_id,
      select:true,
      scrollY:true,
      minWidth:400,
      columns:[
        { id:"Name", header:component_name, editor:"text", fillspace:true, sort:"text"},
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
                text:component_name+" was deleted",
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
      },
      data:this.data
    };
    return {margin:3, rows:[add_new_button,datatable]};
  }
}
