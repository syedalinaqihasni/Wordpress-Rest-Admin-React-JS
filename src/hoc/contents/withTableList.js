import {compose} from 'recompose';
import List from './list';
import withStyles from '../../hoc/withStyles';
import withContentToolbar from '../../hoc/withContentToolbar';

const withTableList = ({namespace}) => WrappedComponent => {

    class Hoc extends List({namespace}){ //Contents{

        render(){
            return this._render({namespace, WrappedComponent});
        }

        bindComponent(component, _options){

            super.bindComponent(namespace, component, _options);

            component[namespace] = Object.assign(component[namespace], {
                _items: {},
                pageArgs: _options.pageArgs,
                initPageArgs: Object.assign({}, _options.pageArgs),
                httpList: _options.httpList,
                reload: this.reload.bind(component),
                updatePageArgs: this.updatePageArgs.bind(component),
                sort: this.sort.bind(component),
                searchbox: this.searchbox.bind(component),
                addNewButton: this.addNewButton.bind(component),
                actionButtons: this.actionButtons.bind(component),
                resetItems: this.resetItems.bind(component),
                parseHttpResponse: this.parseHttpResponse.bind(component),
                updateItems: this.updateItems.bind(component),
                tablelistProps: this.tablelistProps.bind(component),
                updateReferenceItems: this.updateReferenceItems.bind(component),
            });

            const _component = component[namespace];

            const {
                _location: location, 
                reload,
                addNewButton,
                resetItems} = _component; 

            resetItems();

            reload(location);
         
            const {addNewButton: addNewButtonOptions} = _options;

            if(addNewButtonOptions)
                addNewButton(addNewButtonOptions);
        }

        tablelistProps(){
 
           const {_items: {items, itemsCount}, pageArgs, updatePageArgs} = this[namespace];
 
           return{ 
               items,
               count: itemsCount,
               page: (pageArgs.page-1),
               rowsPerPage: pageArgs.per_page,
               rowsPerPageOptions: [5,10,25,50],
               handleChangePage: (e,page) => updatePageArgs({page: (page+1)}),
               handleChangeRowsPerPage: value => updatePageArgs({per_page: value, page: 1}),
           }
        }

    }

    return compose(withStyles, withContentToolbar)(Hoc);
}

export default withTableList;


