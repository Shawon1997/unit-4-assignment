const express = require("express")
const Product = require("../model/product.model")

const client = require("../config/config.redis");
const { patch } = require("..");
//const { find } = require("../model/product.model");
const router = express.Router()


router.post("", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        const products = await Product.find().lean().exec()

        client.set("products", JSON.stringify(products))
        return res.status(201).send(product)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("", async(req, res) => {
    try {
        client.get("products", async(err, fatchedProducts) => {
            if (fatchedProducts) {
                const products = JSON.parse(fatchedProducts)
                return res.status(200).send({
                    products,
                    redis: true
                })
            } else {
                try {
                    const products = await Product.find().lean().exce();
                    client.set("products", JSON.stringify(products));
                    return res.status(200).send({ products, redis: false })
                } catch (err) {
                    return res.status(500).send({ eerr: err.message })
                }
            }
        });

    } catch (err) {
        return res.status(500).send({ rr: err.message })
    }

});


router.get("/:id", async(req, res) => {
    try {
        client.get(`products.${req.params.id} `, async(err, fatchedProducts) => {
            if (fatchedProducts) {
                const product = JSON.parse(fatchedProducts)
                return res.status(200).send({
                    product,
                    redis: true
                })
            } else {
                try {
                    const product = await Product.findById().lean().exce();
                    client.set(`products.${req.params.id} `, JSON.stringify(product));
                    return res.status(200).send({ product, redis: false })
                } catch (err) {
                    return res.status(500).send({ eerr: err.message })
                }
            }
        });

    } catch (err) {
        return res.status(500).send({ err: err.message })
    }

});


router.patch("/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();
        const products = await Product.find().lean().exec();

        client.set(`products.${req.params.id}`, JSON.stringify(product));
        client.set("products", JSON.stringify(products));

        return res.status(200).send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();

        const products = await Product.find().lean().exec();

        client.del(`products.${req.params.id}`);
        client.set("products", JSON.stringify(products));

        return res.status(200).send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});



module.exports = router