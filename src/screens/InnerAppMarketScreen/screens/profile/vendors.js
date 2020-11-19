import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { ThemedView, Header, Text, SearchBar } from '../../components';
import { IconHeader, TextHeader } from '../../containers/HeaderComponent';
import Container from '../../containers/Container';
import ItemVendor from './vendor/ItemVendor';
import { margin } from '../../components/config/spacing';

import data from '../../mock/vendors';

class Vendors extends React.Component {
  render() {
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={'Message'} />}
        />
        <Container style={styles.content}>
          <View style={styles.viewIntro}>
            <Text h2 medium>
              Chat with{'\n'}Vendor
            </Text>
            <Image
              source={require('../../assets/images/chat.png')}
              resizeMode="contain"
            />
          </View>
          <SearchBar
            containerStyle={styles.search}
            cancelButton={false}
            placeholder={'Search Vendors'}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => <ItemVendor item={item} />}
          />
        </Container>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: margin.small,
    flex: 1,
  },
  viewIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: margin.big,
  },
  search: {
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: margin.large + 4,
  },
});

export default Vendors;
