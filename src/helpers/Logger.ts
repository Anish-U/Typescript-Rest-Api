import chalk from 'chalk';

const info = (args: any) => {
	console.log(
		chalk.blue(`[${new Date().toLocaleString()}] [INFO] : `),
		typeof args === 'string' ? chalk.blueBright(args) : args
	);
};

const success = (args: any) => {
	console.log(
		chalk.green(`[${new Date().toLocaleString()}] [SUCCESS] : `),
		typeof args === 'string' ? chalk.greenBright(args) : args
	);
};

const warn = (args: any) => {
	console.log(
		chalk.yellow(`[${new Date().toLocaleString()}] [WARNING] : `),
		typeof args === 'string' ? chalk.yellowBright(args) : args
	);
};

const error = (args: any) => {
	console.log(
		chalk.red(`[${new Date().toLocaleString()}] [ERROR] : `),
		typeof args === 'string' ? chalk.redBright(args) : args
	);
};

export const logger = {
	info,
	warn,
	error,
	success,
};
