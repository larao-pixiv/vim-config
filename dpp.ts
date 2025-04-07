import {
	BaseConfig,
	type ConfigArguments,
	type ConfigReturn,
} from "jsr:@shougo/dpp-vim/config";
import { type Toml } from "jsr:@shougo/dpp-ext-toml";
import { expand } from "jsr:@denops/std/function";


export class Config extends BaseConfig {
	override async config(args: ConfigArguments): ConfigReturn {
		args.contextBuilder.setGlobal({
			protocols: ["git"],
		});

		const [context, options] = await args.contextBuilder.get(args.denops);
		const dotfilesDir = "~/.config/vim/";

		const toml: Toml = await args.dpp.extAction(
			args.denops,
			context,
			options,
			"toml",
			"load",
			{
				path: await expand(args.denops, dotfilesDir + "plugins.toml")
			}
		);

		console.log(toml);

		return {
			plugins: toml.plugins,
			ftplugins: toml.ftplugins,
			hooks_file: toml.hooks_file,
			multiple_hooks: toml.multiple_hooks,
		}
	}
}

