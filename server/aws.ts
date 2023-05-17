import express, { Request, Response }  from 'express'
import AWS from 'aws-sdk';
import config from './config';
import uuid from 'uuid';


const getData = function (req: Request, res: Response) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                iot: Items
            });
        }
    });
}

const getFilteredDataByTimeFrom = function (req: Request, res: Response) {
    // console.log(req.body)
    const fromTime = req.body.fromTime
    const toTime = req.body.toTime

    console.log(fromTime)

    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name,
        FilterExpression : "#timestamp >= :fromTime",
        ExpressionAttributeNames: { "#timestamp": "timestamp" },
        ExpressionAttributeValues: {
            ':fromTime':parseInt(fromTime)
            
    } 
    }
    
    

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                iot: Items
            });
        }
    });
}

const getFilteredDataByTimeTo = function (req: Request, res: Response) {
    // console.log(req.body)
    const toTime = req.body.toTime

    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name,
        FilterExpression : "#timestamp <= :toTime",
        ExpressionAttributeNames: { "#timestamp": "timestamp" },
        ExpressionAttributeValues: {
            ':toTime':parseInt(toTime)
        }
    }
    
    

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                iot: Items
            });
        }
    });
}

const getFilteredDataByTimeFromAndTo = function (req: Request, res: Response) {
    // console.log(req.body)
    const fromTime = req.body.fromTime
    const toTime = req.body.toTime

    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name,
        FilterExpression : "#timestamp >= :fromTime AND #timestamp <= :toTime",
        ExpressionAttributeNames: { "#timestamp": "timestamp" },
        ExpressionAttributeValues: {
            ':fromTime':parseInt(fromTime),
            ':toTime':parseInt(toTime)
        }
    }
    
    

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                iot: Items
            });
        }
    });
}

export {
    getData,
    getFilteredDataByTimeFrom,
    getFilteredDataByTimeTo,
    getFilteredDataByTimeFromAndTo,
}