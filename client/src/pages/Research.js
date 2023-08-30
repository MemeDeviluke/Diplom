import React, {useState} from 'react';
import {Button, Card, Container, Form, Modal} from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Line, Pie} from "react-chartjs-2";
import Integral from "sm-integral";
import { saveAs } from 'file-saver';

ChartJS.register(ArcElement, Tooltip, Legend);

const Research = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const Xi_krit_mass001 = [6.634891,9.210351,11.34488,13.2767,15.08632,16.81187,18.47532,20.09016,21.66605,23.20929,24.72502,26.21696,27.68818]
    const Xi_krit_mass005 = [3.841455, 5.991476, 7.814725, 9.487728, 11.07048, 12.59158, 14.06713, 15.50731, 16.91896, 18.30703, 19.67515, 21.02606, 22.36203]

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => {setShow3(true); var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
        saveAs(blob, "Отчёт.txt");}

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {setShow2(true); var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
        saveAs(blob, "Отчёт.txt");}

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); var blob = new Blob([viborka3,"Гипотеза принята!"],  {type: "text/plain;charset=utf-8"});
        saveAs(blob, "Отчёт.txt");}

    const [numberofelem, setNumberofelem] = React.useState(0)
    const [numberofprohod, setNumberofproh] = React.useState(0)
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
        if (alpha == 0.05){
            Xi_krit = Xi_krit_mass005[k-1]
        }
        return Xi_krit
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



    function ResearchRavnPirs (numberofelements, aravn, bravn, numberofprohodov) {
        let printyata_mass = []
        let printyata1 = 0
        let printyata2 = 0
        if (inlineradio1 == 0.05) {
            for (let i = 0; i < numberofprohodov; i++) {
                let viborka = ravnomergeneration(numberofelements, aravn, bravn)
                let InterRyad2 = createInterRyad(viborka, numberofelements)
                let n_mass2 = n_mass_create(InterRyad2, viborka)
                let xi_mass2 = xi_mass_create(InterRyad2, viborka)
                let pi2 = pi_mass_create_ravnomern(aravn,bravn)
                console.log(pi2)
                let nj_mass2 = nj_mass_ravnomern(pi2, aravn, bravn, InterRyad2, numberofelements)
                let Xi_kvad2 = Xkvd_find(numberofelements, nj_mass2, n_mass2)
                console.log(Xi_kvad2)
                let Xi_krit2 = Xkvd_krit_find_ravn(Xi_krit_mass005, numberofelements, inlineradio1)
                console.log(Xi_krit2)
                let Func_X_mass = FuncX_create(numberofelements)
                let F0_mass = F0x_create_ravnomer(viborka, numberofelements, aravn, bravn)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find005(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit2 > Xi_kvad2) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        if (inlineradio1 == 0.01) {
            for (let k = 0; k < numberofprohodov; k++) {
                let viborka = ravnomergeneration(numberofelements, aravn, bravn)
                let InterRyad2 = createInterRyad(viborka, numberofelements)
                let n_mass2 = n_mass_create(InterRyad2, viborka)
                let xi_mass2 = xi_mass_create(InterRyad2, viborka)
                let pi2 = pi_mass_create_ravnomern(aravn,bravn)
                console.log(pi2)
                let nj_mass2 = nj_mass_ravnomern(pi2, aravn, bravn, InterRyad2, numberofelements)
                let Xi_kvad2 = Xkvd_find(numberofelements, nj_mass2, n_mass2)
                console.log(Xi_kvad2)
                let Xi_krit2 = Xkvd_krit_find_ravn(Xi_krit_mass001, numberofelements, inlineradio1)
                console.log(Xi_krit2)
                let Func_X_mass = FuncX_create(numberofelements)
                let F0_mass = F0x_create_ravnomer(viborka, numberofelements, aravn, bravn)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find001(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit2 > Xi_kvad2) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        return printyata_mass
    }

    function ResearchNormPirsKolm (numberofelements, mean, stde, numberofprohodov) {
        let printyata_mass = []
        let printyata1 = 0
        let printyata2 = 0
        if (inlineradio1 == 0.05) {
            for (let i = 0; i < numberofprohodov; i++) {
                let viborka = normalgeneration(numberofelements, mean, stde)
                console.log(viborka)
                let InterRyad5 = createInterRyad(viborka, numberofelements)
                let n_mass5 = n_mass_create(InterRyad5, viborka)
                let xi_mass5 = xi_mass_create(InterRyad5, viborka)
                let pi_mass5 = pi_mass_create_normal(mean, stde, xi_mass5, InterRyad5, n_mass5, viborka, numberofelements)
                console.log(pi_mass5)
                let nj_mass5 = nj_mass_normal(pi_mass5, InterRyad5, numberofelements)
                let Xi_kvad5 = Xkvd_find(numberofelements, nj_mass5, n_mass5)
                console.log(Xi_kvad5)
                let Xi_krit5 = Xkvd_krit_find_normal(Xi_krit_mass005, numberofelements, inlineradio1)
                console.log(Xi_krit5)
                let Func_X_mass = FuncX_create(numberofelements)
                let y_mass = y_mass_create(viborka, numberofelements)
                let F0_mass = F0x_create_normal(y_mass, numberofelements, mean, stde)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find005(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit5 > Xi_kvad5) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        if (inlineradio1 == 0.01) {
            for (let k = 0; k < numberofprohodov; k++) {
                let viborka = normalgeneration(numberofelements, mean, stde)
                console.log(viborka)
                let InterRyad5 = createInterRyad(viborka, numberofelements)
                let n_mass5 = n_mass_create(InterRyad5, viborka)
                let xi_mass5 = xi_mass_create(InterRyad5, viborka)
                let pi_mass5 = pi_mass_create_normal(mean, stde, xi_mass5, InterRyad5, n_mass5, viborka, numberofelements)
                console.log(pi_mass5)
                let nj_mass5 = nj_mass_normal(pi_mass5, InterRyad5, numberofelements)
                let Xi_kvad5 = Xkvd_find(numberofelements, nj_mass5, n_mass5)
                console.log(Xi_kvad5)
                let Xi_krit5 = Xkvd_krit_find_normal(Xi_krit_mass001, numberofelements, inlineradio1)
                console.log(Xi_krit5)
                let Func_X_mass = FuncX_create(numberofelements)
                let y_mass = y_mass_create(viborka, numberofelements)
                let F0_mass = F0x_create_normal(y_mass, numberofelements, mean, stde)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find001(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit5 > Xi_kvad5) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        return printyata_mass
    }

    function ResearchExpPirsKolm (numberofelements, lamba, numberofprohodov) {
        let printyata_mass = []
        let printyata1 = 0
        let printyata2 = 0
        if (inlineradio1 == 0.05) {
            for (let i = 0; i < numberofprohodov; i++) {
                let viborka = expongeneration(numberofelements, lamba)
                console.log(viborka)
                let InterRyad8 = createInterRyad(viborka, numberofelements)
                let n_mass8 = n_mass_create(InterRyad8, viborka)
                let xi_mass8 = xi_mass_create(InterRyad8, viborka)
                let pi_mass8 = pi_mass_create_expon(lamba, xi_mass8, InterRyad8, n_mass8, viborka, numberofelements)
                console.log(pi_mass8)
                let nj_mass8 = nj_mass_expon(pi_mass8, InterRyad8, numberofelements)
                let Xi_kvad8 = Xkvd_find(numberofelements, nj_mass8, n_mass8)
                console.log(Xi_kvad8)
                let Xi_krit8 = Xkvd_krit_find_expon(Xi_krit_mass005, numberofelements, inlineradio1)
                console.log(Xi_krit8)
                let Func_X_mass = FuncX_create(numberofelements)
                let F0_mass = F0x_create_expom(viborka, lamba, numberofelements)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find005(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit8 > Xi_kvad8) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        if (inlineradio1 == 0.01) {
            for (let k = 0; k < numberofprohodov; k++) {
                let viborka = expongeneration(numberofelements, lamba)
                console.log(viborka)
                let InterRyad8 = createInterRyad(viborka, numberofelements)
                let n_mass8 = n_mass_create(InterRyad8, viborka)
                let xi_mass8 = xi_mass_create(InterRyad8, viborka)
                let pi_mass8 = pi_mass_create_expon(lamba, xi_mass8, InterRyad8, n_mass8, viborka, numberofelements)
                console.log(pi_mass8)
                let nj_mass8 = nj_mass_expon(pi_mass8, InterRyad8, numberofelements)
                let Xi_kvad8 = Xkvd_find(numberofelements, nj_mass8, n_mass8)
                console.log(Xi_kvad8)
                let Xi_krit8 = Xkvd_krit_find_expon(Xi_krit_mass001, numberofelements, inlineradio1)
                console.log(Xi_krit8)
                let Func_X_mass = FuncX_create(numberofelements)
                let F0_mass = F0x_create_expom(viborka, lamba, numberofelements)
                let T_nabl = T_mass_create(F0_mass, Func_X_mass, numberofelements)
                let T_alpha = T_alpha_find001(numberofelements)
                if (T_nabl < T_alpha){
                    printyata1++
                }
                if (Xi_krit8 > Xi_kvad8) {
                    printyata2++
                }
                printyata_mass[0] = printyata2
                printyata_mass[1] = printyata1
                printyata_mass[2] = numberofprohodov - printyata2
                printyata_mass[3] = numberofprohodov - printyata1
            }
        }
        return printyata_mass
    }

    var PrinyatoNumberRavn = ResearchRavnPirs(numberofelem,a_ravn,b_ravn,numberofprohod)
    var PrinyatoNumberNorm = ResearchNormPirsKolm(numberofelem, meang, stdev, numberofprohod)
    var PrinyatoNumberExp = ResearchExpPirsKolm(numberofelem, lambda, numberofprohod)

    var viborka3 = expongeneration(numberofelem, lambda)
    var firstfunction_expon_mass = firstgraph_expon(lambda, numberofelem, viborka3)
    var seconfunction_expon_mass = secondgraph_expon(lambda, numberofelem, viborka3)


    let data1 = {
        labels: ['Принято Пирсона', 'Принято Колмогорова', 'Отклонена Пирсона', 'Отклонена Колмогорова'],
        datasets: [
            {
                label: '# of Votes',
                data: PrinyatoNumberRavn,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,},
        ],
    };


    let data2 = {
        labels: ['Принято Пирсона', 'Принято Колмогорова', 'Отклонена Пирсона', 'Отклонена Колмогорова'],
        datasets: [
            {
                label: '# of Votes',
                data: PrinyatoNumberNorm,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,},
        ],
    };


    let data3 = {
        labels: ['Принято Пирсона', 'Принято Колмогорова', 'Отклонена Пирсона', 'Отклонена Колмогорова'],
        datasets: [
            {
                label: '# of Votes',
                data: PrinyatoNumberExp,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,},
        ],
    };

    return (
        <div>
            <Container
                className="d-flex justify-content-start align-content-start"
                style = {{height: window.innerHeight - 54}}
            >
                <Card style={{width:2100, height:2000}} className="p-5">
                    <h2 className="d-grid gap-3">Исследование эффективности методов проверки статистических гипотез</h2>
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
                    <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
                        <div>
                            Выберите количество проходов методов
                        </div>
                    </Form>
                    <Form.Control
                        placeholder="Введите количество gh[jljd"
                        className="mt-2"
                        defaultValue={numberofprohod}
                        onChange={e => setNumberofproh(e.target.value)}
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
                            <Modal.Title>Круговая диаграмма результатов исследования</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Pie data={data1}/></Modal.Body>
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
                            <Modal.Title>Круговая диаграмма результатов исследования</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Pie data={data2}/></Modal.Body>
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
                            <Modal.Title>Круговая диаграмма результатов исследования</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Pie data={data3}/></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </Container>
        </div>
    );
};

export default Research;