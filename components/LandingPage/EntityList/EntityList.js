import { get } from "lodash";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "../../../db/Schemes";

export default function EntityList({ parentId = "nil", onEntityPressed = () => {}, depth = 0 }) {
	const query = useQuery("Entity").filtered(parentId !== "nil" ? `parent.id = '${parentId}'` : "parent = nil");

	if (query.isEmpty()) {
		return <></>;
	}

	return (
		<>
			{query.map((entity, index) => {
				return (
					<View
						key={index}
						style={{
							...styles.list,
							backgroundColor: colorPalette[depth % 6],
							marginLeft: 12,
							marginTop: 12,
						}}
					>
						<Pressable onPress={() => onEntityPressed(entity.id)}>
							<Text>{`${index + 1}. ${entity.name}`}</Text>
						</Pressable>
						<EntityList parentId={entity.id} onEntityPressed={onEntityPressed} depth={depth + 1} />
					</View>
				);
			})}
		</>
	);
}

const styles = StyleSheet.create({
	list: {
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		padding: 12,
	},
});

const colorPalette = ["#2ecc71", "#f1c40f", "#f39c12", "#e74c3c", "#3498db", "#9b59b6"];
