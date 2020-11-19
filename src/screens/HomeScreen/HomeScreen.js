import React, { useState, useEffect, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components/Netflix/Header/index';
import { TabIcon } from '../../components/Netflix/TabIcon/index';
import { MainMovie } from '../../components/Netflix/MainMovie/index';
import { MoviesList } from '../../components/Netflix/MoviesList/index';
import { Container, ScrollView } from './styles';

import movies from '../../services/movies';

const HomeScreen = ({ isFocused, props, navigation }) => {
  const [storedMovies, setStoredMovies] = useState([]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function loadUserMovies() {
      const stored = JSON.parse(await AsyncStorage.getItem(user.email));

      if (stored) {
        const filtered = movies.filter((movie) => stored.includes(movie.id));
        setStoredMovies(filtered);
      }
    }

    loadUserMovies();
  }, [isFocused]);

  return (
    <Container>
      <Header />
      <ScrollView>
        <MainMovie navigation={navigation} />

        {storedMovies.length > 0 && (
          <MoviesList
            title={`Continue Watching for ${user.name}`}
            movies={storedMovies}
            navigation={navigation}
          />
        )}

        <MoviesList
          title="Popular on Netflix"
          movies={movies}
          navigation={navigation}
        />
        <MoviesList
          title="Trending Now"
          movies={movies}
          navigation={navigation}
        />
      </ScrollView>
    </Container>
  );
};

HomeScreen.propTypes = {
  isFocused: PropTypes.bool,
};

HomeScreen.navigationOptions = {
  tabBarIcon: (props) => <TabIcon name="home-outline" {...props} />,
};

export default withNavigationFocus(HomeScreen);
