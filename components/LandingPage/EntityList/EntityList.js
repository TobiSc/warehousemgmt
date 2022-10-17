import { get } from "lodash";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Entity, useQuery } from "../../../db/Schemes";

export default function EntityList() {
  const query = useQuery(Entity);

  return (
    <FlatList
      data={query.values}
      renderItem={EntityListItem}
      keyExtractor={(e) => e._id}
    />
  );
}

function EntityListItem({item}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{`${get(item, "index") + 1}.`}</Text>
        </View>
    )
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
        flexShrink: 1
    }
})