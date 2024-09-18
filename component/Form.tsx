import React from "react";
import { View } from "react-native";
import { useState } from "react";

interface InputField {
    handleIncrement: () => void;
    handleDecrement: () => void;
    value: number;
}