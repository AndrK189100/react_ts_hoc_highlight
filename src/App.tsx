import React, { useState } from 'react';

type Props = {
    type?: string;
    url?: string;
    views?: number;
    title?: string;
    list?: Props[];
    children?: React.ReactNode;
};

function New(props: Props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
}

function Popular(props: Props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
}

function Article(props: Props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

function Video(props: Props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

function List(props: Props) {
    let WW;
    if (props.list) return props.list.map(item => {
        if (item.views) {
        switch (item.type) {
            case 'video':
                WW = Wrapped(Video, New, Popular);
                return (
                    <WW {...item} />
                );

            case 'article':
                WW = Wrapped(Article, New, Popular);
                return (
                    <WW {...item} />
                );
        }
    }
    });
}

const Wrapped = (Component: React.ComponentType, ComponentNew: React.ComponentType, ComponentPopular: React.ComponentType) => {

    
    return class extends React.Component {
        
        render() {

            return ( this.props.views < 100 ? <ComponentNew ><Component {...this.props}/></ComponentNew> : 
                this.props.views > 1000 ? <ComponentPopular ><Component {...this.props}/></ComponentPopular> : 
                    <Component {...this.props}/>) 
        }
   }
}

export default function App() {
    const [list, setList] = useState([
        {
            key: 1,
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            key: 2,
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            key: 3,
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            key: 4,
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            key: 5,
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            key: 6,
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
