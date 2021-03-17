export function scrollToLastAddedElemen(component,id,show,select){
	if(id){
		if(show === true && select === true){
			component.showItem(id);
			component.select(id);
		}else{
			component.showItem(id);
		}
	}
}
