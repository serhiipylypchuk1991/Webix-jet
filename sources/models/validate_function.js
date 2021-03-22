export function textValidation(Name,rightLength){
	//const regExpResolt = value.search(/[\§\<\>\@\#\$\^\&\*\+\=\\\~\[\]\{\}\|\_]/g),
	//const regExpResolt = Name.search(/[§<>@#$^&*+=~[]{}|_]/g),
	const argLength = Name.length;
	//if(regExpResolt === -1 && argLength >= 1 && argLength <= rightLength){
	if(argLength >= 1 && argLength <= rightLength){
		return Name;
	}else{
		return false;
	}
}
