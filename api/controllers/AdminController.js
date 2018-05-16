/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 rpcuser=test
 rpcpassword=test123
 rpcport=18332
 */

var bitcoinBTC = require('bitcoin');
var clientBTC = new bitcoinBTC.Client({
  host: "192.64.116.199",
  port: "18332",
  user: "test",
  pass: "test123"
});

var bitcoinBTC1 = require('bitcoin');
var clientBTC1 = new bitcoinBTC1.Client({
  host: "192.64.116.199",
  port: "7508",
  user: "BFXCoinrpc",
  pass: "78pW9EbUvNKVYX"
});


module.exports = {
  getAllTransactions: function(req, res, next) {
    clientBTC.cmd('listtransactions', '*', 10000, 0, function(err, listtransactions) {
      if (err) {
        return res.json({
          "message": "Error to getAllTransactions",
          statusCode: 400
        });
      }
      return res.json({
        "listtransactions": listtransactions,
        statusCode: 200
      });

    });
  },
  getBalance: function(req, res, next) {
    clientBTC.cmd('getbalance', function(err, balance) {
      if (err) {
        return res.json({
          "message": "Error to getAllTransactions",
          statusCode: 400
        });
      }
      return res.json({
        "balance": balance,
        statusCode: 200
      });

    });
  },
  sendBTC: function(req, res, next) {
    var coldwalletaddress = 'THBPEh4drborQwZSgrdusiGYzTmbgwHCkd';
    clientBTC1.cmd('walletpassphrase', 'asdf', 800,
      function(err, TransactionDetails1, resHeaders) {
        if (err) {
          console.log(err);
          return res.json({
            "message": "Error to getAllTransactions",
            "err1": err,
            statusCode: 400
          });
        }
        clientBTC1.cmd('sendtoaddress', coldwalletaddress, 0.001,
          function(err1, TransactionDetails, resHeaders) {
            if (err1) {
              return res.json({
                "message": "Error to getAllTransactions",
                "err1": err1,
                statusCode: 400
              });
            }
            return res.json({
              "balance": TransactionDetails,
              statusCode: 200
            });
          });
      });
  }
};