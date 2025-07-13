import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface ILayoutAdmin{
    header?: boolean
    children?: ReactNode
}

export function LayoutAdmin(props: ILayoutAdmin){
    return(
        <Fragment>
            <div className="w-full flex justify-center">
                <div className="w-3/4">
                    {props.header &&
                        <header className="w-full flex justify-between">
                            <div>oi</div>
                            <div>oi</div>
                        </header>
                    }
                    {props.children}
                </div>
            </div>
        </Fragment>
    )
}