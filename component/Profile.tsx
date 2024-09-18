import { useState } from "react";
import React from "react";
import { View, Text } from "react-native";

const Profile = (props) => {
    return(
        <View style={props.styles}>
            <Text>Halo, nama ku, {props.nama}!</Text>
            <Text>Umur ku, {props.umur} tahun</Text>
        </View>
    )
}

export default Profile