import { get } from "lodash";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Entity, useQuery } from "../../../db/Schemes";

export default function EntityList() {
	const query = useQuery(Entity);
	useEffect(() => {
		console.log("Query result: ");
	}, [query]);

	return <FlatList data={query} renderItem={EntityListItem} keyExtractor={(e) => e.id.toString()} />;
}

function EntityListItem({ item, index }) {
	console.log(arguments);
	return (
		<View style={styles.listItem}>
			<Text style={styles.listItemText}>{`${index + 1}. ${item.name}`}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
	},
	listItemText: {
		flexShrink: 1,
	},
});
