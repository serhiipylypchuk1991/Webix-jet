import "./styles/app.css";
import { JetApp, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			debug 	: true,
			start 	: "/top/contacts"
		};

		super({ ...defaults, ...config });
	}
}

const app = new MyApp();
app.use(plugins.Locale);
webix.ready(() => app.render());
