import React from "react";
import { Button, View, Text } from "react-native";

interface ICounter {
    handleIncrement: () => void;
    handleDecrement: () => void;
    handleValue: () => void;
    value: number;
}

const Counter = ({
    handleDecrement,
    handleIncrement,
    handleValue,
    value,
}: ICounter) => {
    return (
        <View>
            <Text>
                {value}
            </Text>
            <Button title="Increment" onPress={handleIncrement} />
            <Button title="Decrement" onPress={handleDecrement} />
            <Button title="Pass Value" onPress={handleValue} />
        </View>
    );
};

export default Counter;