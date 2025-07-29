import { Header } from "@/components/Header";
import { ScrollView, Text, View } from "react-native";

export function ListHeader() {
  return (
    <>
      <Header />
      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
          <Text>teste</Text>
        </ScrollView>
      </View>
    </>
  );
}
