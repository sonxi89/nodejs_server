const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middleware/SortMiddleware');
const app = express();
const port = 3000;
const route = require('./routes/index');

const db = require('./config/db');
//Connect DB
db.connect();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//HTTP logger
// app.use(morgan('combined'));

// Template engine

app.engine(
    'handlebars',
    handlebars({
        helpers: {
            sum: (a, b) => a + b,
            sortable: (filed, sortObj) => {

                const sortType = filed === sortObj.column ? sortObj.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-down',
                }

                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const type = types[sortObj.type]

                const icon = icons[sortType]

                return `<a href="?_sort&column=${filed}&type=${type}">
                <i class="${icon}"></i>
              </a>`
            }
        },
    }),
);
app.set('view engine', 'handlebars');
app.set('views', 'src/resources/views');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Custom Middleware
app.use(SortMiddleware);

//Route Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
