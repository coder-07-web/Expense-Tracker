const Income=require("../models/Income");
const Expense=require("../models/Expense");
const {Types, isValidObjectId}=require("mongoose");

//Dashboard Data

exports.getDashboardData = async(req,res)=>{
    try{
        const userId=req.user.id;
        const userObjectId=new Types.ObjectId(String(userId));

        //Fetch total income
        const totalIncome=await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}},
        ]);
        console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}},
        ]);

        //Get income transaction in the last 60 days

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{$gte:new Date(Date.now() - 60*24*60*60*1000)},

        })
        .sort({date:-1});

        //Get total income for last 60 days

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction) =>sum+transaction.amount,
            0
        );

        //Get expense transaction in the last 60 days

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date:{$gte:new Date(Date.now()-30*24*60*60*1000)},
        }).sort({date:-1});

        //get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum,transaction) =>sum+transaction.amount,
            0
        );
            //fetch last 5 transaction

            const lastTransactions =[
                ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                    (txn) => ({
                        ...txn.toObject(),
                        type:"income",
                    })
                ),
                ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                    (txn) =>({
                        ...txn.toObject(),
                        type:"expense",
                    })
                ),
            ].sort((a,b) =>b.date-a.date);//sort latest fast

            //Fianl response
            res.json({
                totalBalance:
                (totalIncome[0]?.total || 0)-(totalExpense[0]?.total||0),
                totalIncome:totalIncome[0]?.total||0,
                totalExpense:totalExpense[0]?.total||0,
                last30DaysExpense:{
                    total:expensesLast30Days,
                    transaction:last30DaysExpenseTransactions,
                },
                last60DaysIncome:{
                    total:incomeLast60Days,
                    transaction:last60DaysIncomeTransactions,
                },
                recentTransaction:lastTransactions,
            });
        }
        catch(error){
        res.status(500).json({messgae:"Server Error",error});
      
    }
}