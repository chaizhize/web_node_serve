const {exec} = require('../db/mysql')
const xss = require('xss')

const getBlogList = async ({id = '', title = '', content = '', createTime = ''}, author) => {
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
    return await exec(sql)
}
const getBlogDetail = async (id) => {
    let sql = `select * from blogs where id='${id}' `
    const rows = await exec(sql)
    return rows[0]

    // return await exec(sql).then(rows => {
    //     return rows[0]
    // })
}
const newBlog = async (blogData = {}) => {
    let {title, content, author} = blogData;
    const createTime = Date.now();
    title = xss(title)
    let sql = `insert into blogs (title,content,createTime,author) values ('${title}','${content}','${createTime}','${author}');`;
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    // return await exec(sql).then(insertData => {
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}
const updateBlog = async (id, blogData = {}) => {
    console.log(id, 'id');
    const {title, content} = blogData;
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`;
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(updateData => {
    //     if (updateData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}
const delBlog = async (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}';`;
    const data = exec(sql);
    if (data.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(data => {
    //     if (data.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}
