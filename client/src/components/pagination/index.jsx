import axios from '../../api/axios';

const Pagination = ({ setItems, items }) => {
  const getNewItems = async () => {
    const { data } = await axios.get(`${items.next}`);
    data.results = [...items.results, ...data.results];
    setItems(data);
  };

  return (
    <div>
      <div
        className="btn btn-outline-dark px-5"
        style={{ borderRadius: 10, paddingBottom: 0, cursor: 'pointer' }}
        onClick={() => getNewItems()}
      >
        <h5 style={{ fontWeight: 'normal' }}>Hiển thị thêm</h5>
      </div>
    </div>
  );
};
export default Pagination;
