import { constant } from 'lodash';
import PropTypes from 'prop-types';

function Row({ item }) {
  console.log(item);
  return (
    <tr>
      <td className="flex flex-col px-5 pt-5">
        <div className="inline-flex gap-2 items-center m-1">
          <img
            className="w-5 h-5"
            src={
              item.isPR
                ? '/img/illustrations/icons/pull-request.svg'
                : '/img/illustrations/icons/issue.svg'
            }
          />
          <spin className="underline">{item.repo}</spin>
        </div>
        <div>
          <span className="font-semibold text-lg text-gray-600">
            {item.title}
          </span>
        </div>
        <div className="inline-flex m-1">
          <span className="bg-green-200 px-2 py-1 rounded-full">
            enhancement
          </span>
        </div>
        <div className="bg-gray-200 h-px w-full mt-5"></div>
      </td>
    </tr>
  );
}

export default Row;
