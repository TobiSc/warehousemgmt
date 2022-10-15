import { get } from "lodash";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function EntityList({qrCodes=[]}) {
    let mapped = qrCodes.map((e, i)=>{return {index: i, value: e}})
    return (
        <FlatList data={mapped} renderItem={EntityListItem} keyExtractor={e=>get(e, "value")} />
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