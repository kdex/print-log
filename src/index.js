import padStart from "string.prototype.padstart";
import util from "util";
import chalk from "chalk";
function fill(value, minLength = 2) {
	return padStart(value.toString(), minLength, "0");
}
export function print({
	messageStyle,
	title = "",
	args
} = {}) {
	const now = new Date();
	const date = fill(now.getDate());
	const month = fill(now.getMonth() + 1);
	const year = now.getFullYear();
	const hours = fill(now.getHours());
	const minutes = fill(now.getMinutes());
	const seconds = fill(now.getSeconds());
	const milliseconds = fill(now.getMilliseconds(), 4);
	const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
	const formattedDate = `${year}-${month}-${date}`;
	const timestamp = `(${formattedDate} ${formattedTime})`;
	const printArgs = args.map(arg => {
		if (arg instanceof Error) {
			return chalk.bold.red(arg.stack);
		}
		else if (typeof arg === "string") {
			return arg.replace(/"([^"]*)"/g, ($1, $2) => chalk.bold.green($2));
		}
		else if (typeof arg === "number") {
			return chalk.yellow(arg);
		}
		else if (typeof arg === "symbol") {
			return chalk.green(arg);
		}
		else if (arg instanceof Object) {
			return util.inspect(arg, {
				colors: true
			});
		}
		else if (arg.toString) {
			return arg.toString();
		}
		else {
			return arg;
		}
	});
	console.log(`${chalk.bold.white(timestamp)} ${title}${messageStyle(...printArgs)}`);
};
export function log(...args) {
	print({
		messageStyle: chalk.white,
		args
	});
}
export function err(...args) {
	print({
		messageStyle: chalk.bold.red,
		title: chalk.bold.red("Error: "),
		args
	});
};
export function error(...args) {
	err(...args);
};
export function warn(...args) {
	print({
		messageStyle: chalk.bold.yellow,
		title: chalk.bold.yellow("Warning: "),
		args
	});
};
export function debug(...args) {
	print({
		messageStyle: chalk.bold.magenta,
		title: chalk.bold.magenta("Debug: "),
		args
	});
};
export default log;