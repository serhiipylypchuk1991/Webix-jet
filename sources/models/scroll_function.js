export function scrollToLastAddedElemen(component,show,select){
	var last_id = component.getLastId();
		if(last_id){
			if(show === true && select === true){
				component.showItem(last_id);
				component.select(last_id);
			}else{
				component.showItem(last_id);
			}
		}else{console.log("Incorrect last_id");}
}
