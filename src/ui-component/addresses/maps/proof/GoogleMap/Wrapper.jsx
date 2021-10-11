const defaultCreateCache = (options) => {
    const opts = options || {};
    const apiKey = opts.apiKey;
    const libraries = opts.libraries || ['places'];
    const version = opts.version || '3.24';
    const language = opts.language || 'en';
  
    return ScriptCache({
      google: GoogleApi({
        apiKey,
        language,
        libraries,
        version,
      }),
    });
  };
  
  const wrapper = options => (WrappedComponent) => {
    const createCache = options.createCache || defaultCreateCache;
  
    class Wrapper extends Component {
      constructor(props, context) {
        super(props, context);
  
        this.scriptCache = createCache(options);
        this.scriptCache.google.onLoad(this.onLoad.bind(this));
  
        this.state = {
          loaded: false,
          google: null,
        };
      }
  
      onLoad() {
        this.GAPI = window.google;
  
        this.setState({ loaded: true, google: this.GAPI });
      }
  
      render() {
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded,
          google: window.google,
        });
        const mapRef = (el) => { this.map = el; };
  
        return (
          <div>
            <WrappedComponent {...props} />
            <div ref={mapRef} />
          </div>
        );
      }
    }
    Wrapper.propTypes = {
      dispatchGoogleAPI: PropTypes.func,
    };
    Wrapper.defaultProps = {
      dispatchGoogleAPI: null,
    };
  
    return Wrapper;
  };
  
  export default wrapper;