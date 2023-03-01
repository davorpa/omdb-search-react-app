import reactPropTypes from 'prop-types'
import { OMDbResultType } from '@services/omdb'

const movieTypePropType = reactPropTypes.oneOf(Object.values(OMDbResultType))

const postersPropType = reactPropTypes.exact({
  sx150: reactPropTypes.string,
  sx300: reactPropTypes.string,
  sx600: reactPropTypes.string,
  sx1200: reactPropTypes.string,
  fullsize: reactPropTypes.string
})

const moviePropType = reactPropTypes.exact({
  imdbID: reactPropTypes.string.isRequired,
  title: reactPropTypes.string.isRequired,
  type: movieTypePropType.isRequired,
  year: reactPropTypes.string.isRequired,
  posterUrls: postersPropType
})

export default {
  movieType: movieTypePropType,
  moviePosters: postersPropType,
  movie: moviePropType
}
