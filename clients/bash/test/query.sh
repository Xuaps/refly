#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function test_all_args {
    slash=$(mock $scriptDir/../slash "wget")

	$slash search:function,class,type:slash,java

    assertCalled $slash "wget"
    assertCalledExactly 1 $slash "wget"
    assertCalledWith $slash "wget" "http://localhost:3000/search?reference=search&types=function&types=class&types=type&docsets=slash&docsets=java"
}

function test_one_of_each {
    slash=$(mock $scriptDir/../slash "wget")

	$slash search:function:slash

    assertCalledWith $slash "wget" "http://localhost:3000/search?reference=search&types=function&docsets=slash"
}

function test_no_docset {
    slash=$(mock $scriptDir/../slash "wget")

	$slash search:function

    assertCalledWith $slash "wget" "http://localhost:3000/search?reference=search&types=function"
}

function test_no_docset_nor_type {
    slash=$(mock $scriptDir/../slash "wget")

	$slash search

    assertCalledWith $slash "wget" "http://localhost:3000/search?reference=search"
}
