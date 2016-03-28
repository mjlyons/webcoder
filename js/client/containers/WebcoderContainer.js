import { connect } from 'react-redux';
import Webcoder from 'js/client/components/Webcoder';

function mapStateToProps(state) {
  return {
    alertMessage: state.alerts.get('message'),
  };
}

export default connect(mapStateToProps)(Webcoder);
