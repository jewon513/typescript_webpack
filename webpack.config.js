const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const context = path.join(__dirname, '/dist');

const entry = {
	index: "./src/script/index.ts",
	about: "./src/script/about.ts"
}

const createHtmlPlugins = (entry) => {
	const TITLE = "Typescript&Webpack"
	const CommonChunks = []

	const createInstance = (entryName)=>{
		return new HtmlWebpackPlugin({
			title: TITLE,
			filename: `${entryName}.html`,
			chunks: [...CommonChunks, entryName],
			template: `src/template/${entryName}.html`
		})
	}

	return Object.keys(entry).map(key=>{
		return createInstance(key)
	})
}

const htmlPlugins = createHtmlPlugins(entry)

module.exports = {
	entry: entry,
	output: {
		path: context,
		filename: "[name].bundle.js",
	},
	mode:"development",
	module: {
		rules: [
			{
				test: /[\.js]$/,
				exclude: /node_module/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_module/,
				use: {
					loader: "ts-loader",
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, '.'), path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: [".ts", ".js"],
	},
	devServer: {
		hot: true,
		static: {
			directory: path.join(__dirname, 'src')
		},
		host: "localhost", // live-server host 및 port
		port: 3080,
	},
	plugins: [
		...htmlPlugins
	],
}