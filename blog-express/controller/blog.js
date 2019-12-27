const {exec} = require('../db/mysql')
const xss = require('xss')
const getBlogList = ({id = '', title = '', content = '', createTime = ''},author) => {
    let sql = `select * from blogs where 1=1 `
    if (id) {
        sql += `and id='${id}' `
    }
    if (title) {
        sql += `and title like '%${title}%' `
    }
    if (content) {
        sql += `and content like '%${content}%' `
    }
    if (author) {
        sql += `and author like '%${author}%' `
    }
    if (createTime) {
        sql += `and createTime='${createTime}' `
    }
    sql += `order by createTime desc;`
    return exec(sql)
}
const getBlogDetail = (id) => {
    let sql = `select * from blogs where id='${id}' `
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    let {title, content, author} = blogData;
    const createTime = Date.now();
    title = xss(title)
    let sql = `insert into blogs (title,content,createTime,author) values ('${title}','${content}','${createTime}','${author}');`;
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}
const updateBlog = (id, blogData = {}) => {
    console.log(id, 'id');
    const {title, content} = blogData;
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`;
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}
const delBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}';`;
    return exec(sql).then(data => {
        if(data.affectedRows > 0){
            return true
        }
        return false
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}
