import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-uuid";
import QRCode from "qrcode";
import * as Print from "expo-print";
import { GlobalStyle } from "../GlobalStyle";
import { FAB } from "@rneui/themed";

const start = `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">`;

const end = `</body>
</html>`;

export default function QRGenerator() {
	const [size, setSize] = useState("4");
	const [sizeInput, setSizeInput] = useState("4");
	const [amount, SetAmount] = useState("10");

	const generatePDF = () => {
		let proms = Array.from(Array(parseInt(amount))).map((e) => QRCode.toString(uuid()));
		Promise.all(proms).then((res) => {
			let svgs = res.map((svg) => `<svg width="${size}cm"${svg.slice(4)}`).join("");
			let html = `${start}${svgs}${end}`;
			Print.printAsync({ html });
		});
	};

	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

	useEffect(() => {
		if (sizeInput) {
			let newSize = clamp(parseFloat(sizeInput), 0, 27.9);
			setSize(newSize.toString());
		}
	}, [sizeInput]);

	return (
		<View style={GlobalStyle.viewContainer}>
			<Text>Größe in cm:</Text>
			<TextInput keyboardType="numeric" style={GlobalStyle.input} onChangeText={setSizeInput} value={sizeInput} />
			<Text>Anzahl:</Text>
			<TextInput keyboardType="numeric" style={GlobalStyle.input} onChangeText={SetAmount} value={amount} />
			<FAB icon={{ name: "print", color: "#fff" }} size="large" placement="right" onPress={generatePDF} />
		</View>
	);
}
