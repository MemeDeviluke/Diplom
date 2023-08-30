import React, {useState} from 'react';
import {Button, Card, Container, Form, Image, Modal} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import Integral from "sm-integral";
import { saveAs } from 'file-saver';
import Kolmogorov from "../assets/Kolmogorov.png";


const Kolmogorov_Praktika = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const Xi_krit_mass001 = [6.634891,9.210351,11.34488,13.2767,15.08632,16.81187,18.47532,20.09016,21.66605,23.20929,24.72502,26.21696,27.68818]
    const Xi_krit_mass0025 = [5.023903,7.377779,9.348404,11.14326,12.83249,14.44935,16.01277,17.53454,19.02278,20.4832,21.92002,23.33666,24.73558]
    const Xi_krit_mass005 = [3.841455, 5.991476, 7.814725, 9.487728, 11.07048, 12.59158, 14.06713, 15.50731, 16.91896, 18.30703, 19.67515, 21.02606, 22.36203]

    const [numberofelem, setNumberofelem] = React.useState(0)
    const [inlineradio1, setInlineradio1] = React.useState(false)
    const [meang, setMeang] = React.useState(0)
    const [stdev, setStdev] = React.useState(0)
    const [a_ravn, setAravn] = React.useState(0)
    const [b_ravn, setBravn] = React.useState(0)
    const [lambda, setLambda] = React.useState(0)

    function gaussianRandom(meang, stdev) {
        let u = 1 - Math.random(); // Converting [0,1) to (0,1]
        let v = Math.random();
        let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        // Transform to the desired mean and standard deviation:
        return z * stdev + meang;
    }

    function normalgeneration(n, m_normal, sigma_normal){
        let normalvibor = [];
        let x
        for(var i = 0; i < n; i++){
            x = gaussianRandom(m_normal, sigma_normal);
            normalvibor [i] = x;
        }
        console.log(normalvibor);
        normalvibor.sort(function(a,b){
            return a - b
        })
        console.log(normalvibor);
        return normalvibor;
    }

    function exponRandom(lambda) {
        var u = Math.random();
        return -Math.log(1.0 - u) / lambda;
    }

    function expongeneration(n, lambda_expon){
        let exponvibor = [];
        for(var i = 0; i < n; i++){
            let x = exponRandom(lambda_expon);
            exponvibor [i] = x;
        }
        console.log(exponvibor);
        exponvibor.sort(function(a,b){
            return a - b
        })
        console.log(exponvibor);
        return exponvibor;
    }

    function ravnomerRandom(a, b) {
        let x = Math.random()
        x = x * Number(b)
        x = x + Number(a)
        if (b - a == 1){
            x = Number(a) + Math.random()
        }
        if (x > b) {
            x = x - a
        }
        if (x < a) {
            x = x + a
        }
        return x
    }

    function ravnomergeneration(n, a_min, b_max) {
        console.log(n)
        console.log(a_min)
        console.log(b_max)
        let ranvomervibor = [];
        for(var i = 0; i < n; i++){
            let x = ravnomerRandom(a_min, b_max);
            ranvomervibor [i] = x;
        }
        console.log(ranvomervibor);
        ranvomervibor.sort(function (a, b){
            return a - b
        })
        console.log(ranvomervibor);
        return ranvomervibor;
    }



    const handleChange = (e) => {
        setInlineradio1(e.target.value);
    }

    function firstgraph_expon(lambda, numberofelem, exponvibor){
        let firstgraph_mass = [];
        for (let i = 0; i < numberofelem; i++){
            let x = exponvibor[i];
            firstgraph_mass [i] = lambda*Math.exp(-lambda*x);
        }
        console.log(firstgraph_mass)
        return firstgraph_mass;
    }

    function secondgraph_expon(lambda, numberofelem, exponvibor) {
        let secondgraph_mass = [];
        for (let i = 0; i <numberofelem; i++){
            let x = exponvibor[i];
            secondgraph_mass[i] = 1 - Math.exp(-lambda*x);
        }
        console.log(secondgraph_mass)
        return secondgraph_mass;
    }

    function firstgraph_normal(normalvibor, m_normal, sigma_normal, numberofelem){
        let firstgraph_mass = [];
        for (let i = 0; i < numberofelem; i++){
            let x = normalvibor[i];
            firstgraph_mass [i] = (1 /(sigma_normal * Math.sqrt(2 * Math.PI))) * Math.exp((x - m_normal)**2/(-2 * Math.pow(2,sigma_normal)));
        }
        console.log(firstgraph_mass)
        return firstgraph_mass;
    }

    const Integral = require('sm-integral');

    function fuc(x) {
        return Math.exp(- ((x * x)/2))
    }

    function FuncX_create(numberoflelements){
        let FuncX_mass = []
        for(let i = 0; i < numberoflelements; i++){
            FuncX_mass[i] = (i+1)/numberoflelements
        }
        console.log(FuncX_mass)
        return FuncX_mass
    }

    function y_mass_create(viborka, numberofelements){
        let y_mass = []
        let x_center_mass = 0
        let x_center = 0
        for (let i = 0; i < numberofelements; i++) {
            x_center = x_center + viborka[i]
        }
        x_center = x_center/numberofelements
        for (let k = 0; k < numberofelements; k++){
            x_center_mass = x_center_mass + (x_center - viborka[k])**2
        }
        let S_kvad = x_center_mass / (numberofelements - 1)
        let S = Math.sqrt(S_kvad)
        for (let j = 0; j < numberofelements; j++) {
            y_mass[j] = (viborka[j] - x_center)/ S
        }
        console.log(y_mass)
        return y_mass
    }

    function F0x_create_ravnomer(y_mass, numberofelements, aravn, bravn) {
        let F0x_mass = []
        for (let i = 0; i < numberofelements; i++){
            F0x_mass [i] = (y_mass[i] - aravn)/(bravn-aravn)
        }
        console.log(F0x_mass)
        return F0x_mass
    }

    function F0x_create_normal(y_mass, numberofelements, mean, stde) {
        let F0x_mass = [];
        Number(numberofelements)
        for (let i = 0; i < numberofelements; i++){
            let x = y_mass[i];
            let integ = Integral.integrate(fuc,0, Number(x))
            F0x_mass [i] = 0.44 + (1 /  Math.sqrt(2 * Math.PI)) * integ
        }
        console.log(F0x_mass)
        return F0x_mass;
    }

    function F0x_create_expom(y_mass, lambda, numberofelements) {
        let F0x_mass = [];
        for (let i = 0; i < numberofelements; i++){
            let x = y_mass[i];
            F0x_mass[i] = 1 - Math.exp(-lambda*x);
        }
        console.log(F0x_mass)
        return F0x_mass;
    }

    function T_mass_create(F0x, FuncX, numberofelements){
        let t_mass = []
        for (let i = 0; i < numberofelements; i++){
            t_mass[i] = Math.abs((FuncX[i] - F0x[i]))
        }
        t_mass.sort(function (a, b){
            return a - b
        })
        console.log(t_mass)
        let T_nabl = t_mass[numberofelements-1]
        return T_nabl
    }

    function T_alpha_find01(numberofelements) {
        let T_alpha = 1.22/Math.sqrt(numberofelements)
        console.log(T_alpha)
        return T_alpha
    }

    function T_alpha_find005(numberofelements) {
        let T_alpha = 1.36/Math.sqrt(numberofelements)
        console.log(T_alpha)
        return T_alpha
    }

    function T_alpha_find001(numberofelements) {
        let T_alpha = 1.63/Math.sqrt(numberofelements)
        console.log(T_alpha)
        return T_alpha
    }

    function secondgraph_normal(normalvibor, m_normal, sigma_normal, numberofelem) {
        let secondgraph_mass = [];
        Number(numberofelem)
        for (let i = 0; i < numberofelem; i++){
            let x = normalvibor[i];
            let integ = Integral.integrate(fuc,"-inf", Number(x))
            secondgraph_mass [i] = (1 / sigma_normal * Math.sqrt(2 * Math.PI)) * integ
        }
        console.log(secondgraph_mass)
        return secondgraph_mass;
    }

    function firstgraph_ravnomer(aravn, bravn, numberofelem) {
        let firstgraph_mass = [];
        for (let i = 0; i < numberofelem; i++){
            firstgraph_mass[i] = 1/(bravn-aravn)
        }
        console.log(firstgraph_mass)
        return firstgraph_mass;
    }

    function secondgraph_ravnomer(ravnviborka, aravn, bravn, numberofelem) {
        let secondgraph_mass = [];
        for (let i = 0; i < numberofelem; i++) {
            let x = ravnviborka[i]
            secondgraph_mass[i] = (x - aravn)/(bravn - aravn)
        }
        console.log(secondgraph_mass)
        return secondgraph_mass
    }



    const clickRavnomer = () => {
        if (inlineradio1 == 0.1) {
            let viborka_ravn1 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_ravnomer(viborka_ravn1, numberofelem, a_ravn, b_ravn)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            console.log(T_nabl)
            let T_alpha = T_alpha_find01(numberofelem)
            console.log(T_alpha)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.05) {
            let viborka_ravn2 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_ravnomer(viborka_ravn2, numberofelem, a_ravn, b_ravn)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find005(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka_ravn3 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_ravnomer(viborka_ravn3, numberofelem, a_ravn, b_ravn)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find001(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
    };

    const clickNormal = () => {
        if (inlineradio1 == 0.1) {
            let viborka_normal1 = normalgeneration(numberofelem, meang, stdev)
            let Func_X_mass = FuncX_create(numberofelem)
            let y_mass = y_mass_create(viborka_normal1, numberofelem)
            let F0_mass = F0x_create_normal(y_mass, numberofelem, meang, stdev)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find01(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.05) {
            let viborka_normal2 = normalgeneration(numberofelem, meang, stdev)
            let Func_X_mass = FuncX_create(numberofelem)
            let y_mass = y_mass_create(viborka_normal2, numberofelem)
            let F0_mass = F0x_create_normal(y_mass, numberofelem, meang, stdev)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find005(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka_normal3 = normalgeneration(numberofelem, meang, stdev)
            let Func_X_mass = FuncX_create(numberofelem)
            let y_mass = y_mass_create(viborka_normal3, numberofelem)
            let F0_mass = F0x_create_normal(y_mass, numberofelem, meang, stdev)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find001(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
    }

    const clickExponen = () => {
        if (inlineradio1 == 0.1) {
            let viborka_expon1 = expongeneration(numberofelem, lambda)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_expom(viborka_expon1, lambda, numberofelem)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find01(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.05) {
            let viborka_expon2 = expongeneration(numberofelem, lambda)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_expom(viborka_expon2, lambda, numberofelem)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find005(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka_expon3 = expongeneration(numberofelem, lambda)
            let Func_X_mass = FuncX_create(numberofelem)
            let F0_mass = F0x_create_expom(viborka_expon3, lambda, numberofelem)
            let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelem)
            let T_alpha = T_alpha_find001(numberofelem)
            if (T_nabl < T_alpha){
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклоняется!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
    }

    var viborka1 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
    var firstfunction_ravn_mass = firstgraph_ravnomer(a_ravn, b_ravn, numberofelem)
    var secondfunction_ravn_mass = secondgraph_ravnomer(viborka1, a_ravn, b_ravn, numberofelem)

    var viborka2 = normalgeneration(numberofelem,meang,stdev)
    var firstfunction_normal_mass = firstgraph_normal(viborka2, meang, stdev, numberofelem)
    var secondfunction_normal_mass = secondgraph_normal(viborka2, meang, stdev, numberofelem)

    var viborka3 = expongeneration(numberofelem, lambda)
    var firstfunction_expon_mass = firstgraph_expon(lambda, numberofelem, viborka3)
    var seconfunction_expon_mass = secondgraph_expon(lambda, numberofelem, viborka3)

    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Графики функций и плотности распределения',
            },
        },
    };

    let data1 = {
        labels: viborka1,
        datasets: [
            {
                label: 'График плотности распределения',
                data: firstfunction_ravn_mass,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'График функции распределения',
                data: secondfunction_ravn_mass,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Графики функций и плотности распределения',
            },
        },
    };

    let data2 = {
        labels: viborka2,
        datasets: [
            {
                label: 'График плотности распределения',
                data: firstfunction_normal_mass,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'График функции распределения',
                data: secondfunction_normal_mass,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options3 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Графики функций и плотности распределения',
            },
        },
    };

    let data3 = {
        labels: viborka3,
        datasets: [
            {
                label: 'График плотности распределения',
                data: firstfunction_expon_mass,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'График функции распределения',
                data: seconfunction_expon_mass,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Container
            className="d-flex justify-content-start align-content-start"
            style = {{height: window.innerHeight - 54}}
        >
            <Card style={{width:2100, height:2000}} className="p-5">
                <h2 className="d-grid gap-3">Работа с критерием Колмогорова</h2>
                <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
                    <div>
                        Выберите объем выборки
                    </div>
                </Form>
                <Form.Control
                    placeholder="Введите количество элементов"
                    className="mt-2"
                    defaultValue={numberofelem}
                    onChange={e => setNumberofelem(e.target.value)}
                />
                <Form className="d-flex justify-content-start mt-4 pl-3 pr-3">
                    <div>
                        Задайте уровень значимости
                    </div>
                </Form>
                <Form>
                    <div className="mb-3">
                        <Form.Label className="me-3 mt-3 pl-20">α=</Form.Label>
                        <Form.Check
                            inline
                            label="0.1"
                            name="group1"
                            type={"radio"}
                            id={`inline-radio-1`}
                            value={'0.1'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="0.05"
                            name="group1"
                            type={"radio"}
                            id={'inline-radio-2'}
                            value={'0.05'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="0.01"
                            name={"group1"}
                            type={"radio"}
                            id={`inline-radio-3`}
                            value={'0.01'}
                            onChange={handleChange}
                        />
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
                    <div>
                        Выберите закон моделирования измерений и задайте его параметры
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">

                    <Form.Label className="me-3 mt-3 pl-20">Равномерный</Form.Label>
                    <Form.Label className="me-1 mt-3 pl-20">A=</Form.Label>
                    <Form.Control
                        placeholder="Введите параметр"
                        className="mt-2 me-5"
                        defaultValue={a_ravn}
                        onChange={e => setAravn(e.target.value)}
                    />
                    <Form.Label className="ms-2 me-1 mt-3 pl-20">B=</Form.Label>
                    <Form.Control
                        placeholder="Введите параметр"
                        className="mt-2 me-5"
                        defaultValue={b_ravn}
                        onChange={e => setBravn(e.target.value)}
                    />
                    <Button
                        variant={"outline-warning"}
                        className="ms-5"
                        onClick={clickRavnomer}
                    >
                        Проверить гипотезу
                    </Button>
                </Form>
                <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
                    <Form.Label className="me-3 mt-3 pl-20">Нормальный</Form.Label>
                    <Form.Label className="me-1 mt-3 pl-20">μ=</Form.Label>
                    <Form.Control
                        placeholder="Введите параметр"
                        className="mt-2 me-5"
                        defaultValue={meang}
                        onChange={e => setMeang(e.target.value)}
                    />
                    <Form.Label className="ms-2 me-1 mt-3 pl-20">σ²=</Form.Label>
                    <Form.Control
                        placeholder="Введите параметр"
                        className="mt-2 me-5"
                        defaultValue={stdev}
                        onChange={e => setStdev(e.target.value)}
                    />
                    <Button
                        variant={"outline-warning"}
                        className="ms-5"
                        onClick={clickNormal}
                    >
                        Проверить гипотезу
                    </Button>
                </Form>
                <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
                    <Form.Label className="me-3 mt-3 pl-20">Показательный</Form.Label>
                    <Form.Label className="me-1 mt-3 pl-20">λ=</Form.Label>
                    <Form.Control
                        placeholder="Введите параметр"
                        className="mt-2 me-5"
                        defaultValue={lambda}
                        onChange={e => setLambda(e.target.value)}
                    />
                    <Button
                        variant={"outline-warning"}
                        className="ms-5"
                        onClick={clickExponen}
                    >
                        Проверить гипотезу
                    </Button>
                </Form>
                <Button
                    variant={"outline-danger"}
                    className="mt-3"
                    onClick={handleShow3}
                >
                    Нарисовать график равномерного распределения
                </Button>
                <Modal show={show3} onHide={handleClose3} animation={false} size={"lg"} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Графики</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Line data={data1} options={options1}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose3}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    variant={"outline-danger"}
                    className="mt-3"
                    onClick={handleShow2}
                >
                    Нарисовать график нормального распределения
                </Button>
                <Modal show={show2} onHide={handleClose2} animation={false} size={"lg"} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Графики</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Line data={data2} options={options2}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    variant={"outline-danger"}
                    className="mt-3"
                    onClick={handleShow}
                >
                    Нарисовать график показательного распределения
                </Button>
                <Modal show={show} onHide={handleClose} animation={false} size={"lg"} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Графики</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Line data={data3} options={options3}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
            <Image src={Kolmogorov} className="mt-2"/>
        </Container>
    );
};

export default Kolmogorov_Praktika;