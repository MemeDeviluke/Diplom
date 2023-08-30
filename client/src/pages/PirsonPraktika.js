import React, {useState} from 'react';
import {Container, Form, Card, Button, Modal, Image} from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Chart,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Pirson from "../assets/Pirson.png";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Pirson_Praktika = () => {

    const FileSaver = require('file-saver');

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

    function gaussianRandom(me, dev) {
        let u = 1 - Math.random(); // Converting [0,1) to (0,1]
        let v = Math.random();
        let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        // Transform to the desired mean and standard deviation:
        return z * dev + me;
    }

    function MyMin(myarr){
        var al = myarr.length;
        var minimum = myarr[al-1];
        while (al--){
            if(myarr[al] < minimum){
                minimum = myarr[al]
            }
        }
        return minimum;
    };

    function MyMax(myarr){
        var al = myarr.length;
        var maximum = myarr[al-1];
        while (al--){
            if(myarr[al] > maximum){
                maximum = myarr[al]
            }
        }
        return maximum;
    };

    function createInterRyad(viborka, n){
        let interRyad = [];
        let x_max = viborka[n-1];
        console.log(x_max)
        let x_min = viborka[0];
        console.log(x_min)
        let r = x_max - x_min;
        let q = Math.round(Math.sqrt(n));
        let dlina_inter = r/q;
        interRyad[0] = Number(x_min);
        interRyad[q] = Number(x_max);
        for(var i= 1; i < q; i++){
            interRyad[i] = interRyad[i-1] + dlina_inter;
        }
        console.log(interRyad)
        return interRyad;
    }

    function n_mass_create(InterRyad1, viborka1) {
        let n_mass = []
        var nmasscount = 0
        for(let i= 0; i < InterRyad1.length - 1; i++){
            for(let j = 0; j < viborka1.length; j++){
                if (InterRyad1[i] <= viborka1[j] && InterRyad1[i+1] >= viborka1[j]){
                    nmasscount++
                    console.log(nmasscount)
                }
                n_mass [i] = nmasscount
            }
            nmasscount = 0
        }
        console.log(n_mass)
        return n_mass
    }

    function xi_mass_create(InterRyad2, viborka2) {
        let xi_mass = []
        let x_center = 0
        for(let i = 0; i < InterRyad2.length - 1; i++){
            for(let j = 0; j < viborka2.length; j++){
                if (InterRyad2[i] <= viborka2[j] && InterRyad2[i+1] >= viborka2[j]){
                    x_center = Number(x_center) + Number(viborka2[j])
                }
                xi_mass[i] = Number(x_center)
            }
        x_center = 0
        }
        return xi_mass
    }

    function pi_mass_create_ravnomern(aravn, bravn) {
        return 1/(bravn-aravn)
    }

    function pi_mass_create_normal(meang1, stdev1, xi_mass, Interryad, n_massk, viborka, numberofelements) {
        let pi_mass = []
        let x_min = viborka[0]
        let x_max = viborka[numberofelements - 1]
        let r = x_max - x_min
        let q = Math.round(Math.sqrt(numberofelements));
        let li = r/q
        for (let i = 0; i < Interryad.length; i++) {
            pi_mass [i] = (1 /(stdev1 * Math.sqrt(2 * Math.PI))) * Math.exp((xi_mass[i]/n_massk[i] - meang1)**2/(-2 * Math.pow(2,stdev1))) * li
        }
        return pi_mass
    }

    function pi_mass_create_expon(lambda, xi_mass, Interryad, n_massk, viborka, numberofelements) {
        let pi_mass = []
        for (let i = 0; i < Interryad.length; i++) {
            pi_mass[i]= Math.exp(-lambda * Interryad[i]) - Math.exp(-lambda * Interryad[i+1])
        }
        return pi_mass
    }

    function nj_mass_expon(pi_mass, InterRyad_expon, numberofelements) {
        let nj_mass = [];
        for (let i = 0; i < InterRyad_expon.length; i++) {
            nj_mass [i] = pi_mass[i] * numberofelements
        }
        console.log(nj_mass)
        return nj_mass
    }

    function nj_mass_normal(pi_mass, InterRyad_normal, numberofelements) {
        let nj_mass = [];
        for (let i = 0; i < InterRyad_normal.length; i++) {
            nj_mass [i] = pi_mass[i] * numberofelements
        }
        console.log(nj_mass)
        return nj_mass
    }

    function Keew(pi, aravn, bravn, InterRyad_ravn, numberofelements) {
        let nj_mass = []
        nj_mass[0] = pi*numberofelements*(InterRyad_ravn[0] - aravn)
        nj_mass[InterRyad_ravn.length - 2] = numberofelements * pi * (bravn-InterRyad_ravn[InterRyad_ravn.length-1])
    }
    function nj_mass_ravnomern(pi, aravn, bravn, InterRyad_ravn, numberofelements){
        let nj_mass = [];
        for (let i = 0; i < InterRyad_ravn.length; i++){
            nj_mass[i] = pi*numberofelements*(InterRyad_ravn[i+1] - InterRyad_ravn[i])
        }
        console.log(nj_mass)
        return nj_mass
    }


    function Xkvd_find(numberofelements, nj_mass, n_mass) {
        let q = Math.round(Math.sqrt(numberofelements));
        let Xkvd = 0
        for(let i = 0; i < q; i++){
            Xkvd = Xkvd + ((n_mass[i] - nj_mass[i])**2)/nj_mass[i]
            console.log(Xkvd)
        }
        return Xkvd
    }

    function Xkvd_krit_find_ravn(Xi_mass, numberelements, alpha) {
        let k = 0
        let q = Math.round(Math.sqrt(numberelements));
        let Xi_krit = 0
        k = q - 1
        if (alpha == 0.01) {
            Xi_krit = Xi_krit_mass001[k-1]
        }
        if (alpha == 0.025) {
            Xi_krit = Xi_krit_mass0025[k-1]
        }
        if (alpha == 0.05){
            Xi_krit = Xi_krit_mass005[k-1]
        }
        return Xi_krit
    }

    function Xkvd_krit_find_normal(Xi_mass, numberelements, alpha) {
        let k = 0
        let q = Math.round(Math.sqrt(numberelements));
        let Xi_krit = 0
        k = q - 3
        if (alpha == 0.01) {
            Xi_krit = Xi_krit_mass001[k-1]
        }
        if (alpha == 0.025) {
            Xi_krit = Xi_krit_mass0025[k-1]
        }
        if (alpha == 0.05){
            Xi_krit = Xi_krit_mass005[k-1]
        }
        return Xi_krit
    }

    function Xkvd_krit_find_expon(Xi_mass, numberelements, alpha) {
        let k = 0
        let q = Math.round(Math.sqrt(numberelements));
        let Xi_krit = 0
        k = q - 2
        if (alpha == 0.01) {
            Xi_krit = Xi_krit_mass001[k-1]
        }
        if (alpha == 0.025) {
            Xi_krit = Xi_krit_mass0025[k-1]
        }
        if (alpha == 0.05){
            Xi_krit = Xi_krit_mass005[k-1]
        }
        return Xi_krit
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
        let secondgraph_expon = [];
        for (let i = 0; i <numberofelem; i++){
            let x = exponvibor[i];
            secondgraph_expon[i] = 1 - Math.exp(-lambda*x);
        }
        console.log(secondgraph_expon)
        return secondgraph_expon;
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

    function secondgraph_normal(normalvibor, m_normal, sigma_normal, numberofelem) {
        let secondgraph_mass = [];
        Number(numberofelem)
        for (let i = numberofelem; i >= 0; i--){
            let x = normalvibor[i];
            let integ = Integral.integrate(fuc,"-inf", Number(x))
            secondgraph_mass [i] = (1 / Math.sqrt(2 * Math.PI)) * integ
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
        if (inlineradio1 == 0.025) {
            let viborka1 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let InterRyad1 = createInterRyad(viborka1, numberofelem)
            let n_mass1 = n_mass_create(InterRyad1, viborka1)
            let xi_mass1 = xi_mass_create(InterRyad1, viborka1)
            let pi1 = pi_mass_create_ravnomern(a_ravn,b_ravn)
            console.log(pi1)
            let nj_mass1 = nj_mass_ravnomern(pi1, a_ravn, b_ravn, InterRyad1, numberofelem)
            let Xi_kvad1 = Xkvd_find(numberofelem, nj_mass1, n_mass1)
            console.log(Xi_kvad1)
            let Xi_krit1 = Xkvd_krit_find_ravn(Xi_krit_mass0025, numberofelem, inlineradio1)
            console.log(Xi_krit1)
            if (Xi_krit1 > Xi_kvad1) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }

        }
        if (inlineradio1 == 0.05) {
            let viborka2 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let InterRyad2 = createInterRyad(viborka2, numberofelem)
            let n_mass2 = n_mass_create(InterRyad2, viborka2)
            let xi_mass2 = xi_mass_create(InterRyad2, viborka2)
            let pi2 = pi_mass_create_ravnomern(a_ravn,b_ravn)
            console.log(pi2)
            let nj_mass2 = nj_mass_ravnomern(pi2, a_ravn, b_ravn, InterRyad2, numberofelem)
            let Xi_kvad2 = Xkvd_find(numberofelem, nj_mass2, n_mass2)
            console.log(Xi_kvad2)
            let Xi_krit2 = Xkvd_krit_find_ravn(Xi_krit_mass005, numberofelem, inlineradio1)
            console.log(Xi_krit2)
            if (Xi_krit2 > Xi_kvad2) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka3 = ravnomergeneration(numberofelem, a_ravn, b_ravn)
            let InterRyad3 = createInterRyad(viborka3, numberofelem)
            let n_mass3 = n_mass_create(InterRyad3, viborka3)
            let xi_mass3 = xi_mass_create(InterRyad3, viborka3)
            let pi3 = pi_mass_create_ravnomern(a_ravn,b_ravn)
            console.log(pi3)
            let nj_mass3 = nj_mass_ravnomern(pi3, a_ravn, b_ravn, InterRyad3, numberofelem)
            let Xi_kvad3 = Xkvd_find(numberofelem, nj_mass3, n_mass3)
            console.log(Xi_kvad3)
            let Xi_krit3 = Xkvd_krit_find_ravn(Xi_krit_mass001, numberofelem, inlineradio1)
            console.log(Xi_krit3)
            if (Xi_krit3 > Xi_kvad3) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }

        }
    };



    const clickNormal = () => {
        if (inlineradio1 == 0.025) {
            let viborka4 = normalgeneration(numberofelem, meang, stdev)
            console.log(viborka4)
            let InterRyad4 = createInterRyad(viborka4, numberofelem)
            let n_mass4 = n_mass_create(InterRyad4, viborka4)
            let xi_mass4 = xi_mass_create(InterRyad4, viborka4)
            console.log(xi_mass4)
            let pi_mass4 = pi_mass_create_normal(meang, stdev, xi_mass4, InterRyad4, n_mass4, viborka4, numberofelem)
            console.log(pi_mass4)
            let nj_mass4 = nj_mass_normal(pi_mass4, InterRyad4, numberofelem)
            let Xi_kvad4 = Xkvd_find(numberofelem, nj_mass4, n_mass4)
            console.log(Xi_kvad4)
            let Xi_krit4 = Xkvd_krit_find_normal(Xi_krit_mass0025, numberofelem, inlineradio1)
            console.log(Xi_krit4)
            if (Xi_krit4 > Xi_kvad4) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.05) {
            let viborka5 = normalgeneration(numberofelem, meang, stdev)
            console.log(viborka5)
            let InterRyad5 = createInterRyad(viborka5, numberofelem)
            let n_mass5 = n_mass_create(InterRyad5, viborka5)
            let xi_mass5 = xi_mass_create(InterRyad5, viborka5)
            let pi_mass5 = pi_mass_create_normal(meang, stdev, xi_mass5, InterRyad5, n_mass5, viborka5, numberofelem)
            console.log(pi_mass5)
            let nj_mass5 = nj_mass_normal(pi_mass5, InterRyad5, numberofelem)
            let Xi_kvad5 = Xkvd_find(numberofelem, nj_mass5, n_mass5)
            console.log(Xi_kvad5)
            let Xi_krit5 = Xkvd_krit_find_normal(Xi_krit_mass005, numberofelem, inlineradio1)
            console.log(Xi_krit5)
            if (Xi_krit5 > Xi_kvad5) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka6 = normalgeneration(numberofelem, meang, stdev)
            console.log(viborka6)
            let InterRyad6 = createInterRyad(viborka6, numberofelem)
            let n_mass6 = n_mass_create(InterRyad6, viborka6)
            let xi_mass6 = xi_mass_create(InterRyad6, viborka6)
            let pi_mass6 = pi_mass_create_normal(meang, stdev, xi_mass6, InterRyad6, n_mass6, viborka6, numberofelem)
            console.log(pi_mass6)
            let nj_mass6 = nj_mass_normal(pi_mass6, InterRyad6, numberofelem)
            let Xi_kvad6 = Xkvd_find(numberofelem, nj_mass6, n_mass6)
            console.log(Xi_kvad6)
            let Xi_krit6 = Xkvd_krit_find_normal(Xi_krit_mass001, numberofelem, inlineradio1)
            console.log(Xi_krit6)
            if (Xi_krit6 > Xi_kvad6) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
    }

    const clickExponen = () => {
        if (inlineradio1 == 0.025) {
            let viborka7 = expongeneration(numberofelem, lambda)
            console.log(viborka7)
            let InterRyad7 = createInterRyad(viborka7, numberofelem)
            let n_mass7 = n_mass_create(InterRyad7, viborka7)
            let xi_mass7 = xi_mass_create(InterRyad7, viborka7)
            console.log(xi_mass7)
            let pi_mass7 = pi_mass_create_expon(lambda, xi_mass7, InterRyad7, n_mass7, viborka7, numberofelem)
            console.log(pi_mass7)
            let nj_mass7 = nj_mass_expon(pi_mass7, InterRyad7, numberofelem)
            let Xi_kvad7 = Xkvd_find(numberofelem, nj_mass7, n_mass7)
            console.log(Xi_kvad7)
            let Xi_krit7 = Xkvd_krit_find_expon(Xi_krit_mass0025, numberofelem, inlineradio1)
            console.log(Xi_krit7)
            if (Xi_krit7 > Xi_kvad7) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }

            let firstfunction_expon_mass = firstgraph_expon(lambda, numberofelem, viborka7)
            let seconfunction_expon_mass = secondgraph_expon(lambda, numberofelem, viborka7)


        }
        if (inlineradio1 == 0.05) {
            let viborka8 = expongeneration(numberofelem, lambda)
            console.log(viborka8)
            let InterRyad8 = createInterRyad(viborka8, numberofelem)
            let n_mass8 = n_mass_create(InterRyad8, viborka8)
            let xi_mass8 = xi_mass_create(InterRyad8, viborka8)
            let pi_mass8 = pi_mass_create_expon(lambda, xi_mass8, InterRyad8, n_mass8, viborka8, numberofelem)
            console.log(pi_mass8)
            let nj_mass8 = nj_mass_expon(pi_mass8, InterRyad8, numberofelem)
            let Xi_kvad8 = Xkvd_find(numberofelem, nj_mass8, n_mass8)
            console.log(Xi_kvad8)
            let Xi_krit8 = Xkvd_krit_find_expon(Xi_krit_mass005, numberofelem, inlineradio1)
            console.log(Xi_krit8)
            if (Xi_krit8 > Xi_kvad8) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
        }
        if (inlineradio1 == 0.01) {
            let viborka9 = expongeneration(numberofelem, lambda)
            console.log(viborka9)
            let InterRyad9 = createInterRyad(viborka9, numberofelem)
            let n_mass9 = n_mass_create(InterRyad9, viborka9)
            let xi_mass9 = xi_mass_create(InterRyad9, viborka9)
            let pi_mass9 = pi_mass_create_expon(lambda, xi_mass9, InterRyad9, n_mass9, viborka9, numberofelem)
            console.log(pi_mass9)
            let nj_mass9 = nj_mass_expon(pi_mass9, InterRyad9, numberofelem)
            let Xi_kvad9 = Xkvd_find(numberofelem, nj_mass9, n_mass9)
            console.log(Xi_kvad9)
            let Xi_krit9 = Xkvd_krit_find_expon(Xi_krit_mass001, numberofelem, inlineradio1)
            console.log(Xi_krit9)
            if (Xi_krit9 > Xi_kvad9) {
                alert("Гипотеза принята!")
                var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
                saveAs(blob, "Отчёт.txt");
            }
            else {
                alert("Гипотеза отклонена!")
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
        scales: {
            y:{
                title: {
                    display: true,
                    text: 'F(x)'
                },
            },
            x:{
                title: {
                    display: true,
                    text: 'X'
                },
            },
        },
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
        scales: {
            y:{
                title: {
                    display: true,
                    text: 'F(x)'
                },
            },
            x:{
                title: {
                    display: true,
                    text: 'X'
                },
            },
        },
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
        scales: {
            y:{
                title: {
                    display: true,
                    text: 'F(x)'
                },
            },
            x:{
                title: {
                    display: true,
                    text: 'X'
                },
            },
        },
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
                <h2 className="d-grid gap-3">Работа с критерием Пирсона</h2>
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
                            label="0.025"
                            name="group1"
                            type={"radio"}
                            id={`inline-radio-1`}
                            value={'0.025'}
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
            <Image src={Pirson} className="mt-2"/>
        </Container>

    );
};



export default Pirson_Praktika;