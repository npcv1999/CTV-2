import React, {useState, useEffect} from 'react';

import {View, Text, FlatList, Image} from 'react-native';

import BaseUrl from '../../db/BaseUrl';

import styles from './style';

const TopJob = () => {
  const [newJob, setNewJob] = useState([]);

  const url = BaseUrl.baseUrl + 'devwork_new.json';
  const fetchData = async () => {
    await fetch(url)
      .then(res => res.json())
      .then(json => setNewJob(Object.values(json)));
  };
  //Call api
  useEffect(() => {
    fetchData();
  }, []);

  //renderItem
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewItem}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: item.logo}}
          resizeMode="contain"></Image>
        <Text>{item.title}</Text>
      </View>
    );
  };
  //keyExtractor
  const keyExtractor = item => item.id.toString();
  //itemSeparate
  const ItemSeparatorComponent = () => (
    <View style={{width: 5, height: 10}}></View>
  );

  return (
    <View>
      <Text>Việc mới</Text>
      <FlatList
        horizontal
        data={newJob}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}></FlatList>
    </View>
  );
};

export default TopJob;
