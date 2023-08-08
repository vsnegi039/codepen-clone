import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [html, setHTML] = useLocalStorage("html", "");
	const [css, setCSS] = useLocalStorage("css", "");
	const [js, setJS] = useLocalStorage("js", "");
	const [srcDoc, setSrcDoc] = useState("");

	var clearCode = () => {
		setHTML("");
		setCSS("");
		setJS("");
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
        <html>
          <body> ${html} </body>
          <style> ${css} </style>
          <script> ${js} </script>
        </html>
      `);
		}, 250);

		return () => clearTimeout(timeout); // Removes the old timeout if anything changes in the time interval
	}, [html, css, js]);

	return (
		<>
			<div className="block top-block">
				<Editor
					lang="xml"
					name="HTML"
					value={html}
					onChange={setHTML}
				/>
        <Editor 
          lang="css"
          name="CSS"
          value={css} 
          onChange={setCSS}
        />
				<Editor
					lang="javascript"
					name="JS"
					value={js}
					onChange={setJS}
				/>
			</div>
			<div className="block">
				<iframe
					srcDoc={srcDoc}
					title="output"
					sandbox="allow-scripts"
					width="100%"
          height="100%"
          className="out"
				/>
			</div>
			<button className="clear-btn" onClick={() => clearCode()}>
				Clear All Code
			</button>
		</>
	);
}

export default App;
