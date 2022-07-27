import { filterByString } from "../reducers/filterReducer";
//import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

const Filter = (props) => {
  //const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault();
    const filter = event.target.value;
    console.log("filter", filter);
    props.filterByString({ search: filter });
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { filter: state.filter };
};

const mapDispatchToProps = {
  filterByString,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
